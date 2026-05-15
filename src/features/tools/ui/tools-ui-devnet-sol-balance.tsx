import { Text, View } from 'react-native'

export function ToolsUiDevnetSolBalance({ balanceLabel }: { balanceLabel: string }) {
  return (
    <View className="gap-2 rounded-2xl border border-black/5 bg-white/70 px-4 py-3 dark:border-white/10 dark:bg-neutral-900/70">
      <Text className="text-sm font-medium text-foreground">Wallet balance</Text>
      <Text className="text-sm text-muted">{balanceLabel}</Text>
    </View>
  )
}
