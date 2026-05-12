import { HomeUiCardFeatures } from '@/features/home/ui/home-ui-card-features'
import { HomeUiCardGettingStarted } from '@/features/home/ui/home-ui-card-getting-started'
import { ShellUiPage } from '@/features/shell/ui/shell-ui-page'
import { ShellUiPageHeader } from '@/features/shell/ui/shell-ui-page-header'

export function HomeFeatureEntry() {
  return (
    <ShellUiPage>
      <ShellUiPageHeader
        description="Expo Router, HeroUI Native, and Uniwind app that is ready to branch into a real product."
        title="Bee Forge"
      />
      <HomeUiCardFeatures />
      <HomeUiCardGettingStarted />
    </ShellUiPage>
  )
}
