import { ShellUiPage } from '@/features/shell/ui/shell-ui-page'
import { ShellUiPageHeader } from '@/features/shell/ui/shell-ui-page-header'
import { ToolsUiCardDevnetSol } from '@/features/tools/ui/tools-ui-card-devnet-sol'
import { ToolsUiCardNftMint } from '@/features/tools/ui/tools-ui-card-nft-mint'
import { ToolsUiCardStakeTools } from '@/features/tools/ui/tools-ui-card-stake-tools'
import { ToolsUiCardTokenMint } from '@/features/tools/ui/tools-ui-card-token-mint'

export function ToolsFeatureIndex() {
  return (
    <ShellUiPage safeArea>
      <ShellUiPageHeader
        description="Devnet utilities for Solana Mobile workflows. Mint test assets, fund demo accounts, and explore transactions you can reuse in your own apps."
        title="Tools"
      />
      <ToolsUiCardDevnetSol />
      <ToolsUiCardTokenMint />
      <ToolsUiCardNftMint />
      <ToolsUiCardStakeTools />
    </ShellUiPage>
  )
}
