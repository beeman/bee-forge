import { Alert, Button, Input } from 'heroui-native'
import { useMemo, useState } from 'react'
import { Text, View } from 'react-native'

import {
  DEFAULT_TOKEN_DECIMALS,
  DEFAULT_TOKEN_SUPPLY,
  validateTokenDecimals,
  validateTokenSupply,
} from '@/features/tools/data-access/token-amount'
import { DEFAULT_TOKEN_MINT_PROGRAM } from '@/features/tools/data-access/token-mint-program'
import { TokenMintCreateInput } from '@/features/tools/data-access/use-token-mint-create-mutation'
import { ToolsUiTokenMintProgramPicker } from '@/features/tools/ui/tools-ui-token-mint-program-picker'

export function ToolsUiTokenMintForm({
  createTokenMint,
  errorMessage,
  isCreating,
  resetCreateError,
}: {
  createTokenMint: (input: TokenMintCreateInput) => void
  errorMessage?: string
  isCreating: boolean
  resetCreateError: () => void
}) {
  const [decimals, setDecimals] = useState(DEFAULT_TOKEN_DECIMALS)
  const [supply, setSupply] = useState(DEFAULT_TOKEN_SUPPLY)
  const [tokenProgram, setTokenProgram] = useState<TokenMintCreateInput['tokenProgram']>(DEFAULT_TOKEN_MINT_PROGRAM)
  const decimalsError = useMemo(() => validateTokenDecimals(decimals), [decimals])
  const supplyError = useMemo(
    () => (decimalsError ? undefined : validateTokenSupply(supply, Number(decimals))),
    [decimals, decimalsError, supply],
  )

  return (
    <>
      <View className="gap-2">
        <Text className="text-sm font-medium text-foreground">Decimals</Text>
        <Input
          isDisabled={isCreating}
          isInvalid={!!decimalsError}
          keyboardType="number-pad"
          onChangeText={(value) => {
            setDecimals(value)
            resetCreateError()
          }}
          value={decimals}
        />
        <Text className={decimalsError ? 'text-sm text-danger' : 'text-sm text-muted'}>
          {decimalsError ?? 'Use 0 to 9 decimals.'}
        </Text>
      </View>

      <View className="gap-2">
        <Text className="text-sm font-medium text-foreground">Initial supply</Text>
        <Input
          isDisabled={isCreating}
          isInvalid={!!supplyError}
          keyboardType="decimal-pad"
          onChangeText={(value) => {
            setSupply(value)
            resetCreateError()
          }}
          value={supply}
        />
        <Text className={supplyError ? 'text-sm text-danger' : 'text-sm text-muted'}>
          {supplyError ?? 'Mint this amount to your connected wallet after creation.'}
        </Text>
      </View>

      <ToolsUiTokenMintProgramPicker
        isDisabled={isCreating}
        selectTokenProgram={(value) => {
          setTokenProgram(value)
          resetCreateError()
        }}
        tokenProgram={tokenProgram}
      />

      {errorMessage ? (
        <Alert status="danger">
          <Alert.Content>
            <Alert.Title>Mint failed</Alert.Title>
            <Alert.Description>{errorMessage}</Alert.Description>
          </Alert.Content>
        </Alert>
      ) : null}

      <Button
        isDisabled={!!decimalsError || isCreating || !!supplyError}
        onPress={() => createTokenMint({ decimals: Number(decimals), supply, tokenProgram })}
      >
        {isCreating ? 'Creating...' : 'Create token mint'}
      </Button>
    </>
  )
}
