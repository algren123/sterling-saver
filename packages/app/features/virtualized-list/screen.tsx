import type { Essentials } from '@t4/api/src/db/schema'
import { Button, Paragraph, Spinner, VirtualList, YStack } from '@t4/ui'
import { ArrowLeft } from '@tamagui/lucide-icons'
import { trpc } from 'app/utils/trpc'
import { useRef } from 'react'
import { SolitoImage } from 'solito/image'
import { useLink } from 'solito/link'
import { Animated } from 'react-native'

const MAX_HEADER_HEIGHT = 75
const MIN_HEADER_HEIGHT = 40
const SCROLL_RANGE = MAX_HEADER_HEIGHT - MIN_HEADER_HEIGHT

export const VirtualizedListScreen = (): React.ReactNode => {
  const query = trpc.essentials.all.useQuery()

  const backLink = useLink({
    href: '/',
  })
  const scrollOffsetY = useRef(new Animated.Value(0)).current
  const animatedHeaderHeight = scrollOffsetY.interpolate({
    inputRange: [0, SCROLL_RANGE],
    outputRange: [MAX_HEADER_HEIGHT, MIN_HEADER_HEIGHT],
    extrapolate: 'clamp',
  })

  if (query.isInitialLoading) {
    return <Spinner />
  }

  return (
    <YStack fullscreen flex={1}>
      <Button
        {...backLink}
        animation={['quick', { height: { overshootClamping: true } }]}
        icon={ArrowLeft}
        chromeless
        backgroundColor="$background"
        br="$0"
        jc="flex-start"
        h={animatedHeaderHeight}
      >
        Back
      </Button>
      {query.error ? <Paragraph>Error fetching Essentials: {query.error.message}</Paragraph> : null}
      {query.data?.length ? (
        <VirtualList
          flex={1}
          data={query.data}
          renderItem={EssentialsListItem}
          estimatedItemSize={80}
          pt="$3"
          scrollEventThrottle={10}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }], {
            useNativeDriver: false,
          })}
        />
      ) : (
        <>
          {query.error ? (
            <Paragraph>Error fetching Essentials: {query.error.message}</Paragraph>
          ) : null}
          {!query.isLoading && <Paragraph>No Essentials found.</Paragraph>}
        </>
      )}
    </YStack>
  )
}

const EssentialsListItem = (essentials: Essentials): React.ReactElement => {
  return (
    <YStack flexDirection="row" paddingLeft="$2">
      <SolitoImage
        src="/t4-logo.png"
        width={56}
        height={56}
        alt="T4 Logo"
        style={{
          marginTop: 8,
        }}
      />
      <YStack>
        <Paragraph paddingTop="$2" paddingLeft="$3" paddingBottom="$1" fontSize={16}>
          {essentials.entertainment}
        </Paragraph>
        <Paragraph paddingLeft="$3" fontSize={16} opacity={0.6}>
          {essentials.food}
        </Paragraph>
        <Paragraph paddingLeft="$3" fontSize={16} opacity={0.6}>
          {essentials.health}
        </Paragraph>
      </YStack>
    </YStack>
  )
}
