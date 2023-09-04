import { FlashList, type FlashListProps } from '@shopify/flash-list'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export function VirtualList<T>(props: FlashListProps<T>) {
  const { top, bottom } = useSafeAreaInsets()

  return (
    <FlashList
      contentContainerStyle={{
        paddingTop: top,
        paddingBottom: bottom,
      }}
      {...props}
    />
  )
}
