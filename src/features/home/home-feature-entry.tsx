import { HomeUiCardBuiltForLearning } from '@/features/home/ui/home-ui-card-built-for-learning'
import { HomeUiCardToolsForExperiments } from '@/features/home/ui/home-ui-card-tools-for-experiments'
import { HomeUiCardWalletFlows } from '@/features/home/ui/home-ui-card-wallet-flows'
import { ShellUiPage } from '@/features/shell/ui/shell-ui-page'
import { ShellUiPageHeader } from '@/features/shell/ui/shell-ui-page-header'

export function HomeFeatureEntry() {
  return (
    <ShellUiPage safeArea>
      <ShellUiPageHeader
        description="A devnet workbench for Solana Mobile builders. Forge test assets, try wallet flows, and learn the transactions behind real mobile apps."
        title="Bee Forge"
      />
      <HomeUiCardToolsForExperiments />
      <HomeUiCardWalletFlows />
      <HomeUiCardBuiltForLearning />
    </ShellUiPage>
  )
}
