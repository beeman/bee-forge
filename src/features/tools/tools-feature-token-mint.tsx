import { useMobileWallet } from '@wallet-ui/react-native-kit'

import { ShellUiPage } from '@/features/shell/ui/shell-ui-page'
import { ToolsFeatureTokenMintCreate } from '@/features/tools/tools-feature-token-mint-create'
import { ToolsUiTokenMintConnectWallet } from '@/features/tools/ui/tools-ui-token-mint-connect-wallet'

export function ToolsFeatureTokenMint() {
  const { account } = useMobileWallet()

  return (
    <ShellUiPage>
      {account ? <ToolsFeatureTokenMintCreate address={account.address} /> : <ToolsUiTokenMintConnectWallet />}
    </ShellUiPage>
  )
}
