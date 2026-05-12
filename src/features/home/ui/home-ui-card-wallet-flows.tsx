import { Card } from 'heroui-native'

export function HomeUiCardWalletFlows() {
  return (
    <Card>
      <Card.Body className="gap-3">
        <Card.Title>Wallet flows in context</Card.Title>
        <Card.Description>
          Connect a wallet, inspect the active account, and try the signing flows mobile apps actually use.
        </Card.Description>
      </Card.Body>
    </Card>
  )
}
