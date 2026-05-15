import * as Linking from 'expo-linking'
import { Button } from 'heroui-native'
import { ExternalLink } from 'lucide-react-native'
import { Text, View } from 'react-native'

const FAUCET_URL = 'https://faucet.solana.com'

export function ToolsUiDevnetSolFaucetButton() {
  return (
    <Button onPress={() => Linking.openURL(FAUCET_URL)} variant="secondary">
      <View className="flex-row items-center justify-center gap-2">
        <Text className="font-medium text-foreground">Open Solana faucet</Text>
        <ExternalLink className="text-foreground" size={16} />
      </View>
    </Button>
  )
}
