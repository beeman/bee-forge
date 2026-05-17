import { Text, View } from 'react-native'

import { getTokenMintProgramLabel } from '@/features/tools/data-access/token-mint-program'
import { TokenMintCreateResult } from '@/features/tools/data-access/use-token-mint-create-mutation'

export function ToolsUiTokenMintResult({ result }: { result: TokenMintCreateResult }) {
  return (
    <View className="gap-2 rounded-2xl border border-black/5 bg-white/70 px-4 py-3 dark:border-white/10 dark:bg-neutral-900/70">
      <Text className="text-sm font-medium text-foreground">Created token mint</Text>
      <Text className="text-xs leading-5 text-muted" ellipsizeMode="middle" numberOfLines={1} selectable>
        {result.mint}
      </Text>
      <Text className="text-sm font-medium text-foreground">Token program</Text>
      <Text className="text-xs leading-5 text-muted" ellipsizeMode="middle" numberOfLines={1} selectable>
        {getTokenMintProgramLabel(result.tokenProgram)}
      </Text>
      <Text className="text-sm font-medium text-foreground">Transaction</Text>
      <Text className="text-xs leading-5 text-muted" ellipsizeMode="middle" numberOfLines={1} selectable>
        {result.signature}
      </Text>
      {result.ata ? (
        <>
          <Text className="text-sm font-medium text-foreground">Token account</Text>
          <Text className="text-xs leading-5 text-muted" ellipsizeMode="middle" numberOfLines={1} selectable>
            {result.ata}
          </Text>
        </>
      ) : null}
    </View>
  )
}
