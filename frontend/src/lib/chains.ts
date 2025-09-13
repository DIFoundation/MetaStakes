import { Chain } from 'viem';

export const liskTestnet = {
  id: 4202,
  name: 'Lisk Sepolia Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'LSK',
    symbol: 'LSK',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.sepolia-api.lisk.com'],
    },
    public: {
      http: ['https://rpc.sepolia-api.lisk.com'],
    },
  },
  blockExplorers: {
    default: { name: 'blockscout', url: 'https://sepolia-blockscout.lisk.com/' },
  },
  testnet: true,
} as const satisfies Chain;
