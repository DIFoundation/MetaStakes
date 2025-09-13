import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-network-helpers";
import { vars } from "hardhat/config";

const PRIVATE_KEY = vars.get("PRIVATE_KEY_2");
const API_KEY = vars.get("ETHERSCAN_API_KEY"); // from etherscan

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      viaIR: true, // <--- This enables the Yul Intermediate Representation
    },
  },
  networks: {
    somnia_testnet: {
      url: "https://dream-rpc.somnia.network",
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      somnia_testnet: API_KEY,
    },
    customChains: [
      {
        network: "somnia_testnet",
        chainId: 50312,
        urls: {
          apiURL: "https://shannon-explorer.somnia.network/api",
          browserURL: "https://shannon-explorer.somnia.network",
        }
      }
    ],
  },
  sourcify: {
    enabled: false,
  },
};

export default config;