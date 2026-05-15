import { useMobileWallet } from '@wallet-ui/react-native-kit'

import { ShellUiPage } from '@/features/shell/ui/shell-ui-page'
import { ToolsFeatureDevnetSolRequest } from '@/features/tools/tools-feature-devnet-sol-request'
import { ToolsUiDevnetSolConnectWallet } from '@/features/tools/ui/tools-ui-devnet-sol-connect-wallet'

export function ToolsFeatureDevnetSol() {
  const { account } = useMobileWallet()

  return (
    <ShellUiPage>
      {account ? <ToolsFeatureDevnetSolRequest address={account.address} /> : <ToolsUiDevnetSolConnectWallet />}
    </ShellUiPage>
  )
}
