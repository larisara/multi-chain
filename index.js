const Web3 = require('web3')
const WEB3_URL = 'https://bsc-dataseed1.ninicoin.io'
const web3 = new Web3(WEB3_URL)
const tokens = require('./consts/token')
const { NETWORKS, POOLS } = require('./consts/index')
const { getInfo, getTVL } = require('./utils')

!(async function () {
  const harmonyPools = await getInfo(POOLS[NETWORKS.HARMONY_ONE.chainId])
  const fantomPools = await getInfo(POOLS[NETWORKS.FANTOM.chainId])
  const harmonyTVL = await getTVL(POOLS[NETWORKS.HARMONY_ONE.chainId])
  const fantomTVL = await getTVL(POOLS[NETWORKS.FANTOM.chainId])

  let result = {}
  Object.assign(result, { [NETWORKS.HARMONY_ONE.chainId]: harmonyPools })
  Object.assign(result, { [NETWORKS.FANTOM.chainId]: fantomPools })
  result['tvl'] = {
    [NETWORKS.HARMONY_ONE.chainId]: harmonyTVL,
    [NETWORKS.FANTOM.chainId]: fantomTVL,
  }
  console.log(result)
  let fs = require('fs')
  fs.writeFileSync('/root/twinprime-api/www-data/static/multi-chain', JSON.stringify(result))
})()
