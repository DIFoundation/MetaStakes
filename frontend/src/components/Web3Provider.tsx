'use client';

// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http, WagmiProvider } from 'wagmi';
import { getDefaultConfig, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
// import { somniaTestnet } from '@/lib/chains';
import { somniaTestnet } from 'viem/chains';

// Create a client
const queryClient = new QueryClient();

// RainbowKit config with Wagmi config included
const config = getDefaultConfig({
  appName: 'Stake & Bake',
  projectId: '3815d2e1168083c700a0d194dafdb7d2',
  chains: [somniaTestnet],
  transports: [http('https://dream-rpc.somnia.network')],
});

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider 
          theme={darkTheme({
            accentColor: '#ffffff',
            accentColorForeground: '#000000',
            borderRadius: 'medium',
            fontStack: 'system',
            overlayBlur: 'small',
          })}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
