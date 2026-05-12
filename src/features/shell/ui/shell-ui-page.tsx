import { PropsWithChildren } from 'react'
import { ScrollView, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export function ShellUiPage({ children, safeArea = false }: PropsWithChildren<{ safeArea?: boolean }>) {
  const insets = useSafeAreaInsets()

  return (
    <ScrollView className="flex-1" contentInsetAdjustmentBehavior="automatic">
      <View
        className="gap-6 px-6"
        style={safeArea ? { paddingBottom: insets.bottom + 32, paddingTop: insets.top + 32 } : undefined}
      >
        {children}
      </View>
    </ScrollView>
  )
}
