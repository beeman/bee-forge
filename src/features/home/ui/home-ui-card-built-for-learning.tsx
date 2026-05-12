import { Card } from 'heroui-native'

export function HomeUiCardBuiltForLearning() {
  return (
    <Card>
      <Card.Body className="gap-3">
        <Card.Title>Built for learning</Card.Title>
        <Card.Description>
          Each tool should show what happened, why it matters, and how the flow maps to a real app.
        </Card.Description>
      </Card.Body>
    </Card>
  )
}
