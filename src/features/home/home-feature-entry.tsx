import { Text, View } from 'react-native'

import { HomeUiCardBuiltForLearning } from '@/features/home/ui/home-ui-card-built-for-learning'
import { HomeUiCardToolsForExperiments } from '@/features/home/ui/home-ui-card-tools-for-experiments'
import { HomeUiCardWalletFlows } from '@/features/home/ui/home-ui-card-wallet-flows'
import { ShellUiPage } from '@/features/shell/ui/shell-ui-page'

export function HomeFeatureEntry() {
  return (
    <ShellUiPage>
      <View className="gap-4">
        <Text className="text-3xl font-semibold text-foreground">Bee Forge</Text>
        <Text className="text-2xl italic leading-8 text-foreground">
          Forge test assets. Try wallet flows. Ship mobile apps.
        </Text>
        <Text className="text-base leading-6 text-muted">
          A devnet workbench for Solana Mobile builders experimenting with tokens, NFTs, staking, and wallet
          interactions.
        </Text>
      </View>
      <HomeUiCardToolsForExperiments />
      <HomeUiCardWalletFlows />
      <HomeUiCardBuiltForLearning />
    </ShellUiPage>
  )
}
