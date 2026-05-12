import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createSolanaDevnet, MobileWalletProvider } from '@wallet-ui/react-native-kit'
import { HeroUINativeProvider } from 'heroui-native'
import { ReactNode } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { useTheme } from '@/features/shell/data-access/use-theme'
import { ShellUiThemeStatusBar } from '@/features/shell/ui/shell-ui-theme-status-bar'

const cluster = createSolanaDevnet()
const identity = { name: 'Bee Forge' }
const queryClient = new QueryClient()

export function AppProviders({ children }: { children: ReactNode }) {
  const { backgroundColor } = useTheme()

  return (
    <GestureHandlerRootView style={{ backgroundColor, flex: 1 }}>
      <HeroUINativeProvider config={{ devInfo: { stylingPrinciples: false } }}>
        <QueryClientProvider client={queryClient}>
          <MobileWalletProvider cluster={cluster} identity={identity}>
            {children}
          </MobileWalletProvider>
        </QueryClientProvider>
        <ShellUiThemeStatusBar />
      </HeroUINativeProvider>
    </GestureHandlerRootView>
  )
}
