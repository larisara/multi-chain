const { Interface } = require('@ethersproject/abi')

const Web3 = require('web3')
const WEB3_URL = 'https://bsc-dataseed1.ninicoin.io'
const web3 = new Web3(WEB3_URL)
// import { Contract } from 'ethers';
const MULTICALL_ABI = require('../consts/abis/MKRMulticall.abi.json')
const MULTICALL = '0x41263cba59eb80dc200f3e2544eda4ed6a90e76c'

const mkrMulticall = async (abi, calls) => {
  const multi = new web3.eth.Contract(MULTICALL_ABI, MULTICALL)

  const itf = new Interface(abi)
  const calldata = calls.map((call) => [call.address.toLowerCase(), itf.encodeFunctionData(call.name, call.params)])

  const { returnData } = await multi.methods.aggregate(calldata).call()
  const res = returnData.map((call, i) => itf.decodeFunctionResult(calls[i].name, call))
  return res
}
module.exports.mkrMulticall = mkrMulticall
