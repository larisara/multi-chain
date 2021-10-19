const utils = require('../utils/mkrMulticall')
const ERC20_ABI = require('../consts/abis/ERC20.abi.json')
const PAIR_ABI = require('../consts/abis/Pair.abi.json')
const SWAP_ABI = require('../consts/abis/Swap.abi.json')
const ethers = require('ethers')
const Web3 = require('web3')
const { isCommunityResourcable } = require('@ethersproject/providers')
const { NETWORKS } = require('../consts')
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

async function getTVL(data) {
  const provider = new ethers.providers.JsonRpcProvider(data.rpcUrl)
  let tvl = ethers.constants.Zero
  for (const [k, v] of Object.entries(data.pools)) {
    const poolTvl = await getTokenBalance(v, provider)
    tvl = tvl.add(poolTvl)
  }
  return ethers.utils.formatEther(tvl)
}

async function getAPY(pool, network) {
  const web3 = new Web3(network.rpcUrl);
  let latest = await web3.eth.getBlockNumber()
  let earliest = await web3.eth.getBlock('earliest')
  console.log('ealrier', earliest)
  let swapContract = new web3.eth.Contract(SWAP_ABI, pool.swapAddress)
  // let DAY_BLOCKS = network.chainId === NETWORKS.FANTOM.chainId ? 100000 : 1000
  let DAY_BLOCKS = 6550
  let vPriceOldFetch
  try {
    // vPriceOldFetch = await swapContract.methods.getVirtualPrice().call('',latest - DAY_BLOCKS )
    vPriceOldFetch = await swapContract.methods.getVirtualPrice().call('', "earliest")
    console.log('old', vPriceOldFetch)
  } catch (e) {
    console.error(e)
    vPriceOldFetch = 1 * (10 ** 18)
    DAY_BLOCKS = 1;
  }
  let vPriceFetch
  try {
    vPriceFetch = await swapContract.methods.getVirtualPrice().call()
    console.log('new', vPriceFetch)
  } catch (e) {
    vPriceFetch = 1 * (10 ** 18)
  }

  let vPrice = vPriceOldFetch
  let vPriceNew = vPriceFetch
  let apy = (vPriceNew - vPrice) / vPrice * 100 * 365

  return apy
}

async function getInfo(data) {
  const provider = new ethers.providers.JsonRpcProvider(data.rpcUrl)
  let result = []
  for (const [k, v] of Object.entries(data.pools)) {
    const _totalSupply = await getTotalSupply(v.address, provider)
    const _virtualPrice = await getVirtualPrice(v.swapAddress, provider)
    if (data.chainId !== NETWORKS.BSC.chainId) {
      const _apy = await getAPY(v, data)
      result.push({
        ...v,
        _totalSupply: _totalSupply.toString(),
        _virtualPrice: _virtualPrice.toString(),
        apy: _apy.toString(),
        totalSupply: _totalSupply
          .div(ethers.constants.WeiPerEther)
          .mul(_virtualPrice)
          .div(ethers.constants.WeiPerEther)
          .toString(),
      })
    }
    else
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
  return result
}

module.exports = {
  getInfo, getTVL
}
