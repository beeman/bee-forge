import { Alert, Button, Input } from 'heroui-native'
import { useMemo, useState } from 'react'
import { Text, View } from 'react-native'

import { DEFAULT_DEVNET_SOL_AMOUNT, validateDevnetSolAmount } from '@/features/tools/data-access/sol-amount'
import { ToolsUiDevnetSolFaucetButton } from '@/features/tools/ui/tools-ui-devnet-sol-faucet-button'

export function ToolsUiDevnetSolRequestForm({
  errorMessage,
  isRequesting,
  requestDevnetSol,
  resetRequestError,
}: {
  errorMessage?: string
  isRequesting: boolean
  requestDevnetSol: (amount: string) => void
  resetRequestError: () => void
}) {
  const [amount, setAmount] = useState(DEFAULT_DEVNET_SOL_AMOUNT)
  const amountError = useMemo(() => validateDevnetSolAmount(amount), [amount])

  return (
    <>
      <View className="gap-2">
        <Text className="text-sm font-medium text-foreground">Amount</Text>
        <Input
          isDisabled={isRequesting}
          isInvalid={!!amountError}
          keyboardType="decimal-pad"
          onChangeText={(value) => {
            setAmount(value)
            resetRequestError()
          }}
          value={amount}
        />
        <Text className={amountError ? 'text-sm text-danger' : 'text-sm text-muted'}>
          {amountError ?? 'Enter 0.1 to 2.0 SOL.'}
        </Text>
      </View>

      {errorMessage ? (
        <Alert status="danger">
          <Alert.Content>
            <Alert.Title>Request failed</Alert.Title>
            <Alert.Description>{errorMessage}</Alert.Description>
          </Alert.Content>
        </Alert>
      ) : null}

      <View className="gap-3">
        <Button isDisabled={!!amountError || isRequesting} onPress={() => requestDevnetSol(amount)}>
          {isRequesting ? 'Requesting...' : 'Request devnet SOL'}
        </Button>
        <ToolsUiDevnetSolFaucetButton />
      </View>
    </>
  )
}
