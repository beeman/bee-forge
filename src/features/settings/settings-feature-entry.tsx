import { SettingsFeatureAccount } from '@/features/settings/settings-feature-account'
import { SettingsUiCardAppearance } from '@/features/settings/ui/settings-ui-card-appearance'
import { ShellUiPage } from '@/features/shell/ui/shell-ui-page'
import { ShellUiPageHeader } from '@/features/shell/ui/shell-ui-page-header'

export function SettingsFeatureEntry() {
  return (
    <ShellUiPage>
      <ShellUiPageHeader
        description="This generic settings is ready to add product-specific settings later."
        title="Settings"
      />
      <SettingsUiCardAppearance />
      <SettingsFeatureAccount />
    </ShellUiPage>
  )
}
