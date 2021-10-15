const utils = require('../utils/mkrMulticall')
const ERC20_ABI = require('../consts/abis/ERC20.abi.json')
const PAIR_ABI = require('../consts/abis/Pair.abi.json')
const SWAP_ABI = require('../consts/abis/Swap.abi.json')
const ethers = require('ethers')

async function getTotalSupply(address, provider) {
    const pair = new ethers.Contract(address, PAIR_ABI, provider)
    const _totalSupply = await pair.totalSupply()
    return _totalSupply
}

async function getVirtualPrice(address, provider) {
    const swap = new ethers.Contract(address, SWAP_ABI, provider)
    const _virtualPrice = await swap.getVirtualPrice()
    return _virtualPrice
}
async function getTokenBalance(data, provider) {
    const swap = new ethers.Contract(data.swapAddress, SWAP_ABI, provider)
    let result = []
    for (const [k, v] of Object.entries(data.tokensInPool)) {
        const _tokenBalance = await swap.getTokenBalance(k)
        result.push({ ...v, tokenBalance: _tokenBalance, ts: _tokenBalance.toString() })
    }
    const map = result.map((x) => ethers.utils.formatUnits(x.tokenBalance, x.decimals))
    let poolTvl = ethers.constants.Zero
    for (const v of map) {
        poolTvl = poolTvl.add(ethers.utils.parseEther(v))
    }
    return poolTvl
}
async function getInfo(data) {
    const provider = new ethers.providers.JsonRpcProvider(data.rpcUrl)
    let result = []
    let tvl = ethers.constants.Zero
    for (const [k, v] of Object.entries(data.pools)) {
        const _totalSupply = await getTotalSupply(v.address, provider)
        const _virtualPrice = await getVirtualPrice(v.swapAddress, provider)
        const poolTvl = await getTokenBalance(v, provider)
        tvl = tvl.add(poolTvl)
        result.push({
            ...v,
            _totalSupply: _totalSupply.toString(),
            _virtualPrice: _virtualPrice.toString(),
            totalSupply: _totalSupply
                .div(ethers.constants.WeiPerEther)
                .mul(_virtualPrice)
                .div(ethers.constants.WeiPerEther)
                .toString(),
        })
    }
    result['tvl'] = ethers.utils.formatEther(tvl)
    return result
}

module.exports = {
    getInfo,
}
