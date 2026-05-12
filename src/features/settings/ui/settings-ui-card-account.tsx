import { Button, Card } from 'heroui-native'

export function SettingsUiCardAccount({ isSigningOut, signOut }: { isSigningOut: boolean; signOut: () => void }) {
  return (
    <Card>
      <Card.Body className="gap-3">
        <Card.Title>Session</Card.Title>
        <Card.Description>Manage the current wallet and app session.</Card.Description>
        <Button className="w-full" onPress={signOut} variant="secondary">
          {isSigningOut ? 'Signing out...' : 'Sign out'}
        </Button>
      </Card.Body>
    </Card>
  )
}
