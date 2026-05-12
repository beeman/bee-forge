import { Href, Link } from 'expo-router'
import { Card } from 'heroui-native'
import { ChevronRight } from 'lucide-react-native'
import { Pressable, View } from 'react-native'

export function ToolsUiCard({ body, href, title }: { body: string; href: Href; title: string }) {
  return (
    <Link asChild href={href}>
      <Pressable accessibilityRole="button">
        <Card>
          <Card.Body className="gap-3">
            <View className="flex-row items-center justify-between gap-4">
              <View className="flex-1 gap-3">
                <Card.Title>{title}</Card.Title>
                <Card.Description>{body}</Card.Description>
              </View>
              <ChevronRight className="text-muted" size={22} />
            </View>
          </Card.Body>
        </Card>
      </Pressable>
    </Link>
  )
}
