import { Chain } from 'viem';

export const somniaTestnet = {
  id: 50312,
  name: 'Somni Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'STT',
    symbol: 'STT',
  },
  rpcUrls: {
    default: {
      http: ['https://dream-rpc.somnia.network'],
    },
    public: {
      http: ['https://dream-rpc.somnia.network'],
    },
  },
  blockExplorers: {
    default: { name: 'blockscout', url: 'https://shannon-explorer.somnia.network/' },
  },
  testnet: true,
} as const satisfies Chain;
