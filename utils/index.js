const utils = require('../utils/mkrMulticall')
const ERC20_ABI = require('../consts/abis/ERC20.abi.json')
const PAIR_ABI = require('../consts/abis/Pair.abi.json')
const SWAP_ABI = require('../consts/abis/Swap.abi.json')
const { tokenWithLpForPrice, tokenWithOracle } = require('../consts/token')
const TARGET_USER = process.env.TARGET_USER || '0x7C4A2d016024Eb1e373DEC9B41d176733fAbd350'
const DEV_SHARE = '0x36e55406fab7a11f3fa030fb2eee20b60cddb64f'
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
const ORACLE_ABI = require('../consts/abis/UniswapPairOracle.abi.json')
const Web3 = require('web3')
const WEB3_URL = 'https://bsc-dataseed1.ninicoin.io'
const web3 = new Web3(WEB3_URL)
const { bignumber } = require('mathjs')
const ethers = require('ethers')
const bn = require('bignumber.js')

async function getTotalSupply(data) {
    const provider = new ethers.providers.JsonRpcProvider(data.rpcUrl)
    let result = []
    for (const [k, v] of Object.entries(data.pools)) {
        console.log()
        const pair = new ethers.Contract(v.address, PAIR_ABI, provider)
        const totalSupply = await pair.totalSupply()
        result.push({ pool: v, totalSupply: ethers.utils.formatEther(totalSupply) })
    }
    console.log(result)
    getVirtualPrice(data)
    return result
}

async function getVirtualPrice(data) {
    const provider = new ethers.providers.JsonRpcProvider(data.rpcUrl)
    let result = []
    for (const [k, v] of Object.entries(data.pools)) {
        console.log()
        const swap = new ethers.Contract(v.swapAddress, SWAP_ABI, provider)
        const virtualPrice = await swap.getVirtualPrice()
        const lpInPercent = virtualPrice.eq(ethers.constants.WeiPerEther)
            ? ethers.constants.Zero
            : virtualPrice.div(ethers.constants.WeiPerEther).sub(ethers.constants.One).mul(100)
        const DAY_PER_YEAR = 365
        const ONE_DAY_SECS = 86400
        const timeInSecs = blockDiff * 3
        const timeInDays = timeInSecs / ONE_DAY_SECS
        const apy = virtualPrice.isZero()
            ? ethers.constants.Zero
            : lpInPercent.div(timeInDays).mul(DAY_PER_YEAR)
        console.log('apy', apy)
        const result = result.push({ pool: v, apy: ethers.utils.formatEther(apy) })
    }

    return result
}

function getDevShareBalance(tokens) {
    const calls = Object.values(tokens).map((token) => {
        if (!token.address) return
        return {
            address: token.address,
            name: 'balanceOf',
            params: [DEV_SHARE],
        }
    })
    return utils.mkrMulticall(ERC20_ABI, calls)
}

function getZeroAddressBalance(tokens) {
    const calls = Object.values(tokens).map((token) => {
        if (!token.address) return
        return {
            address: token.address,
            name: 'balanceOf',
            params: [ZERO_ADDRESS],
        }
    })
    return utils.mkrMulticall(ERC20_ABI, calls)
}

function getPriceFromOracle(_tokens) {
    const calls = Object.values(_tokens).map((token) => {
        return {
            address: token.oracle,
            name: 'consult',
            params: [token.address, web3.utils.toWei('1')],
        }
    })
    return utils.mkrMulticall(ORACLE_ABI, calls)
}

function getPriceFromReserves() {
    const calls = Object.values(tokenWithLpForPrice).map((token) => {
        return {
            address: token.lpForPrice.address,
            name: 'getReserves',
            params: [],
        }
    })

    return utils.mkrMulticall(PAIR_ABI, calls)
}

async function getCirculatingSupplyFromTokenWithOracle() {
    let result = {}
    // * token with oracles
    const price = await getPriceFromOracle(tokenWithOracle)
    const totalSupply = await getTotalSupply(tokenWithOracle)
    const devShareBalance = await getDevShareBalance(tokenWithOracle)
    const zeroAddressBalance = await getZeroAddressBalance(tokenWithOracle)

    for (const [key, token] of Object.entries(tokenWithOracle)) {
        const _totalSupply = bignumber(totalSupply[key].toString())
        const _devShareBalance = bignumber(devShareBalance[key].toString())
        const _zeroAddressBalance = bignumber(zeroAddressBalance[key].toString())
        const _price = bignumber(price[key].toString())
        const circulatingSupply = _totalSupply.minus(_devShareBalance).minus(_zeroAddressBalance)
        const marketCap = circulatingSupply.times(_price).div(1e18)
        result = Object.assign(result, {
            [token.symbol]: {
                circulatingSupply: circulatingSupply.div(1e18).toFixed(6).toString(),
                price: _price.div(1e18).toFixed(6).toString(),
                marketCap: marketCap.div(1e18).toFixed(6).toString(),
                totalSupply: _totalSupply.div(1e18).toFixed(6).toString(),
            },
        })
    }

    return result
}

async function getCirculatingSupplyFromTokenWithLpForPrice() {
    let result = {}
    // * token with lp for price
    const priceFromReserves = await getPriceFromReserves()
    const totalSupply = await getTotalSupply(tokenWithLpForPrice)
    const devShareBalance = await getDevShareBalance(tokenWithLpForPrice)
    const zeroAddressBalance = await getZeroAddressBalance(tokenWithLpForPrice)

    for (const [key, token] of Object.entries(tokenWithLpForPrice)) {
        const _totalSupply = bignumber(totalSupply[key].toString())
        const _devShareBalance = bignumber(devShareBalance[key].toString())
        const _zeroAddressBalance = bignumber(zeroAddressBalance[key].toString())
        const _reserve0 = bignumber(priceFromReserves[key]['_reserve0'].toString())
        const _reserve1 = bignumber(priceFromReserves[key]['_reserve1'].toString())
        const _price =
            token.lpForPrice.token0.address.toLowerCase() === token.address.toLowerCase()
                ? _reserve1.div(_reserve0)
                : _reserve0.div(_reserve1)
        const circulatingSupply = _totalSupply.sub(_devShareBalance).sub(_zeroAddressBalance)
        const marketCap = circulatingSupply.mul(_price)
        result = Object.assign(result, {
            [token.symbol]: {
                circulatingSupply: circulatingSupply.div(1e18).toFixed(6).toString(),
                price: _price.toFixed(6).toString(),
                marketCap: marketCap.div(1e18).toFixed(6).toString(),
                totalSupply: _totalSupply.div(1e18).toFixed(6).toString(),
            },
        })
    }

    return result
}
async function getCall(constractAddress, blockNumber) {
    const contract = new web3.eth.Contract(ERC20_ABI, constractAddress)

    // const data = await contract.methods
    //   .tranfer(tokenA, tokenB, liquidity, amountAMin, amountBMin, to, deadline)
    //   .encodeABI()
    const transactionObject = {
        from: TARGET_USER,
        to: contract.options.address,
        value: '0',
        gas: 500000,
        gasPrice: web3.utils.toWei('10', 'gwei'),
        chainId: '56',
        // data,
    }
    const callObject = {
        to: contract.options.address,
        data: transactionObject.encodeABI(),
    }

    try {
        const result = await web3.eth.call(callObject, blockNumber)
        console.log('result', result)
    } catch (error) {
        console.log('error', error)
    }
}
module.exports = {
    getTotalSupply,
    getCall,
    getDevShareBalance,
    getZeroAddressBalance,
    getPriceFromOracle,
    getPriceFromReserves,
    getCirculatingSupplyFromTokenWithOracle,
    getCirculatingSupplyFromTokenWithLpForPrice,
}
