/** @type import('hardhat/config').HardhatUserConfig */

require('@nomiclabs/hardhat-ethers')
require('dotenv').config()
const { createAlchemyWeb3 } = require('@alch/alchemy-web3')
const { task } = require('hardhat/config')

const {
  API_URL_GOERLI,
  API_URL_MUMBAI,
  API_URL_SEPOLIA,
  PRIVATE_KEY,
} = process.env

/**
 * Hardhat tasks allow us to automate certain processes within the project environment. Because we need to be sure the nonce is identical across all networks, we will create a task that will return the nonce of each network. Additionally, let's include our wallet balance to ensure we have enough funds to deploy.


 */

task(
  'account',
  'returns nonce and balance for specified address on multiple networks',
)
  .addParam('address')
  .setAction(async (address) => {
    const web3Goerli = createAlchemyWeb3(API_URL_GOERLI)
    const web3Mumbai = createAlchemyWeb3(API_URL_MUMBAI)
    const web3Sepolia = createAlchemyWeb3(API_URL_SEPOLIA)

    const networkIDArr = [
      'Ethereum Goerli:',
      'Polygon  Mumbai:',
      'EThereum Sepolia:',
    ]
    const providerArr = [web3Goerli, web3Mumbai, web3Sepolia]
    const resultArr = []

    for (let i = 0; i < providerArr.length; i++) {
      const nonce = await providerArr[i].eth.getTransactionCount(
        address.address,
        'latest',
      )
      const balance = await providerArr[i].eth.getBalance(address.address)
      resultArr.push([
        networkIDArr[i],
        nonce,
        parseFloat(providerArr[i].utils.fromWei(balance, 'ether')).toFixed(2) +
          'ETH',
      ])
    }
    resultArr.unshift(['  |NETWORK|   |NONCE|   |BALANCE|  '])
    console.log(resultArr)
  })

module.exports = {
  solidity: '0.8.13',
  networks: {
    hardhat: {},
    goerli: {
      url: API_URL_GOERLI,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    mumbai: {
      url: API_URL_MUMBAI,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    sepolia: {
      url: API_URL_SEPOLIA,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
}
