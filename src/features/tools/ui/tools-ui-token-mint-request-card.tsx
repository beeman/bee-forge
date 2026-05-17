import { Card } from 'heroui-native'
import { ReactNode } from 'react'
import { View } from 'react-native'

export function ToolsUiTokenMintRequestCard({ children }: { children: ReactNode }) {
  return (
    <Card>
      <Card.Body className="gap-4">
        <View className="gap-2">
          <Card.Title>Create token</Card.Title>
          <Card.Description>
            Create an SPL Token mint on devnet and mint the initial supply to your connected wallet.
          </Card.Description>
        </View>
        {children}
      </Card.Body>
    </Card>
  )
}
