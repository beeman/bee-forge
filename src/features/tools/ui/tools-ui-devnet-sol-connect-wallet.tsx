import { Card } from 'heroui-native'

import { ToolsUiDevnetSolFaucetButton } from '@/features/tools/ui/tools-ui-devnet-sol-faucet-button'

export function ToolsUiDevnetSolConnectWallet() {
  return (
    <Card>
      <Card.Body className="gap-4">
        <Card.Title>Request SOL</Card.Title>
        <Card.Description>Connect a wallet before requesting devnet SOL.</Card.Description>
        <ToolsUiDevnetSolFaucetButton />
      </Card.Body>
    </Card>
  )
}
