import { Card, Chip } from 'heroui-native'
import { Text, View } from 'react-native'

export function WalletUiCardStatus({
  accountAddress,
  accountLabel,
  balanceLabel,
  chain,
  transactionSignature,
}: {
  accountAddress?: string
  accountLabel: string
  balanceLabel: string
  chain: string
  transactionSignature?: string
}) {
  return (
    <Card>
      <Card.Body className="gap-3">
        <Card.Title>Account</Card.Title>
        <Card.Description>{accountAddress ? `Connected to ${accountLabel}` : 'No wallet connected.'}</Card.Description>
        <View className="flex-row flex-wrap gap-2">
          <Chip color={accountAddress ? 'success' : 'warning'} variant="secondary">
            {accountAddress ? 'Connected' : 'Disconnected'}
          </Chip>
          <Chip color="accent" variant="secondary">
            {chain}
          </Chip>
        </View>
        {accountAddress ? (
          <View className="gap-2 rounded-2xl border border-black/5 bg-white/70 px-4 py-3 dark:border-white/10 dark:bg-neutral-900/70">
            <Text className="text-sm font-medium text-foreground">Address</Text>
            <Text className="text-xs leading-5 text-muted" ellipsizeMode="middle" numberOfLines={1} selectable>
              {accountAddress}
            </Text>
            <Text className="text-sm font-medium text-foreground">Balance</Text>
            <Text className="text-sm text-muted">{balanceLabel}</Text>
            {transactionSignature ? (
              <>
                <Text className="text-sm font-medium text-foreground">Last transaction</Text>
                <Text className="text-xs leading-5 text-muted" ellipsizeMode="middle" numberOfLines={1} selectable>
                  {transactionSignature}
                </Text>
              </>
            ) : null}
          </View>
        ) : null}
      </Card.Body>
    </Card>
  )
}
