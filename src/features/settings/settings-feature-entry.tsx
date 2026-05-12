import { SettingsFeatureAccount } from '@/features/settings/settings-feature-account'
import { SettingsUiCardAppearance } from '@/features/settings/ui/settings-ui-card-appearance'
import { ShellUiPage } from '@/features/shell/ui/shell-ui-page'
import { ShellUiPageHeader } from '@/features/shell/ui/shell-ui-page-header'

export function SettingsFeatureEntry() {
  return (
    <ShellUiPage safeArea>
      <ShellUiPageHeader description="Configure Bee Forge preferences and session behavior." title="Settings" />
      <SettingsUiCardAppearance />
      <SettingsFeatureAccount />
    </ShellUiPage>
  )
}
