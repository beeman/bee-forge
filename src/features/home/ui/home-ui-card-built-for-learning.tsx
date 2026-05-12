import { Card } from 'heroui-native'

export function HomeUiCardBuiltForLearning() {
  return (
    <Card>
      <Card.Body className="gap-3">
        <Card.Title>Learn by doing</Card.Title>
        <Card.Description>
          See transaction results, account changes, and builder notes after each action.
        </Card.Description>
      </Card.Body>
    </Card>
  )
}
