import { Button, Card } from 'heroui-native'
import { View } from 'react-native'

export function WalletUiCardActions({
  connect,
  disconnect,
  hasAccount,
  isConnecting,
  isDisconnecting,
  isSendingTransaction,
  isSigningIn,
  isSigningMessage,
  sendMemoTransaction,
  signIn,
  signMessage,
}: {
  connect: () => void
  disconnect: () => void
  hasAccount: boolean
  isConnecting: boolean
  isDisconnecting: boolean
  isSendingTransaction: boolean
  isSigningIn: boolean
  isSigningMessage: boolean
  sendMemoTransaction: () => void
  signIn: () => void
  signMessage: () => void
}) {
  return (
    <Card>
      <Card.Body className="gap-3">
        <Card.Title>Actions</Card.Title>
        <Card.Description>Connect, sign in, sign a message, send a memo transaction, or disconnect.</Card.Description>
        <View className="gap-3">
          <View className="flex-row gap-3">
            <Button className="flex-1" isDisabled={hasAccount || isConnecting} onPress={connect}>
              {isConnecting ? 'Connecting...' : 'Connect'}
            </Button>
            <Button
              className="flex-1"
              isDisabled={!hasAccount || isDisconnecting}
              onPress={disconnect}
              variant="secondary"
            >
              {isDisconnecting ? 'Disconnecting...' : 'Disconnect'}
            </Button>
          </View>
          <Button isDisabled={isSigningIn} onPress={signIn} variant="secondary">
            {isSigningIn ? 'Signing in...' : hasAccount ? 'Sign in with wallet' : 'Sign in and connect'}
          </Button>
          <View className="flex-row gap-3">
            <Button
              className="flex-1"
              isDisabled={!hasAccount || isSigningMessage}
              onPress={signMessage}
              variant="secondary"
            >
              {isSigningMessage ? 'Signing...' : 'Sign message'}
            </Button>
            <Button
              className="flex-1"
              isDisabled={!hasAccount || isSendingTransaction}
              onPress={sendMemoTransaction}
              variant="secondary"
            >
              {isSendingTransaction ? 'Sending...' : 'Send memo'}
            </Button>
          </View>
        </View>
      </Card.Body>
    </Card>
  )
}
