import { Button } from 'heroui-native'
import { Text, View } from 'react-native'

import { TOKEN_MINT_PROGRAMS } from '@/features/tools/data-access/token-mint-program'
import { type TokenMintCreateInput } from '@/features/tools/data-access/use-token-mint-create-mutation'

export function ToolsUiTokenMintProgramPicker({
  isDisabled,
  selectTokenProgram,
  tokenProgram,
}: {
  isDisabled: boolean
  selectTokenProgram: (tokenProgram: TokenMintCreateInput['tokenProgram']) => void
  tokenProgram: TokenMintCreateInput['tokenProgram']
}) {
  return (
    <View className="gap-2">
      <Text className="text-sm font-medium text-foreground">Token program</Text>
      <View className="flex-row gap-2">
        {TOKEN_MINT_PROGRAMS.map((program) => (
          <Button
            className="flex-1"
            isDisabled={isDisabled}
            key={program.address}
            onPress={() => selectTokenProgram(program.address)}
            variant={program.address === tokenProgram ? undefined : 'secondary'}
          >
            {program.label}
          </Button>
        ))}
      </View>
      <Text className="text-sm text-muted">Choose the program that will own the mint.</Text>
    </View>
  )
}
