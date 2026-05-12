import { PropsWithChildren } from 'react'
import { ScrollView, View } from 'react-native'

export function ShellUiPage({ children }: PropsWithChildren) {
  return (
    <ScrollView className="flex-1" contentInsetAdjustmentBehavior="automatic">
      <View className="gap-6 px-6 py-8">{children}</View>
    </ScrollView>
  )
}
