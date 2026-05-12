import { Stack } from 'expo-router'

import { useTheme } from '@/features/shell/data-access/use-theme'

export default function ToolsLayout() {
  const { screenOptions } = useTheme()

  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen name="index" options={{ headerShown: false, title: 'Tools' }} />
      <Stack.Screen name="devnet-sol" options={{ title: 'Devnet SOL' }} />
      <Stack.Screen name="nft-mint" options={{ title: 'NFT Mint' }} />
      <Stack.Screen name="stake-tools" options={{ title: 'Stake Tools' }} />
      <Stack.Screen name="token-mint" options={{ title: 'Token Mint' }} />
    </Stack>
  )
}
