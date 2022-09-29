import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config();

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      forking: {
        // @ts-ignore
        url: process.env.ETH_MAINNET_URL,
      }
    },
    goerli: {
      url: process.env.GOERLI_URL,
      // @ts-ignore
      accounts: [process.env.PRIVATE_KEY]
    },
    mainnet: {
      url: process.env.ETH_MAINNET_URL,
      // @ts-ignore
      accounts: [process.env.PRIVATE_KEY]
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
