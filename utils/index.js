const utils = require('../utils/mkrMulticall')
const ERC20_ABI = require('../consts/abis/ERC20.abi.json')
const PAIR_ABI = require('../consts/abis/Pair.abi.json')
const SWAP_ABI = require('../consts/abis/Swap.abi.json')
const ethers = require('ethers')

async function getTotalSupply(data) {
    const provider = new ethers.providers.JsonRpcProvider(data.rpcUrl)
    let result = []
    for (const [k, v] of Object.entries(data.pools)) {
        const pair = new ethers.Contract(v.address, PAIR_ABI, provider)
        const totalSupply = await pair.totalSupply()
        result.push({ ...v, totalSupply: ethers.utils.formatEther(totalSupply) })
    }
    // getVirtualPrice(data)
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

module.exports = {
    getTotalSupply,
}
