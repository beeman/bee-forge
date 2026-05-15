import { Card } from 'heroui-native'
import { ReactNode } from 'react'
import { View } from 'react-native'

export function ToolsUiDevnetSolRequestCard({ children, description }: { children: ReactNode; description: string }) {
  return (
    <Card>
      <Card.Body className="gap-4">
        <View className="gap-2">
          <Card.Title>Request SOL</Card.Title>
          <Card.Description>{description}</Card.Description>
        </View>
        {children}
      </Card.Body>
    </Card>
  )
}
