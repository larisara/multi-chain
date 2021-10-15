const Web3 = require('web3')
const WEB3_URL = 'https://bsc-dataseed1.ninicoin.io'
const web3 = new Web3(WEB3_URL)
const tokens = require('./consts/token')
const { NETWORKS, POOLS } = require('./consts/index')
const { getInfo } = require('./utils')

!(async function () {
    const harmony = await getInfo(POOLS[NETWORKS.HARMONY_ONE.chainId])
    const fantom = await getInfo(POOLS[NETWORKS.FANTOM.chainId])

    let result = {}
    Object.assign(result, { [NETWORKS.HARMONY_ONE.chainId]: harmony })
    Object.assign(result, { [NETWORKS.FANTOM.chainId]: fantom })
    console.log(result)
    let fs = require('fs')
    fs.writeFileSync('/root/twinprime-api/www-data/static/multi-chain', JSON.stringify(result))
})()
