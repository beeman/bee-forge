import { Card } from 'heroui-native'

import { ShellUiPage } from '@/features/shell/ui/shell-ui-page'
import { ShellUiPageHeader } from '@/features/shell/ui/shell-ui-page-header'

export function ToolsFeaturePlaceholder({ body, title }: { body: string; title: string }) {
  return (
    <ShellUiPage>
      <ShellUiPageHeader description={body} title={title} />
      <Card>
        <Card.Body className="gap-3">
          <Card.Title>{title}</Card.Title>
          <Card.Description>This tool is coming soon.</Card.Description>
        </Card.Body>
      </Card>
    </ShellUiPage>
  )
}
