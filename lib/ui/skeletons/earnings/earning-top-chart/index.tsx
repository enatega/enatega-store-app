import { MotiView } from 'moti'
import { Skeleton } from 'moti/skeleton'

export default function EarningTopChartSkeleton() {
  return (
    <MotiView className="h-[40%] flex flex-row w-[95%] p-2 justify-between items-end bg-gray-200">
      <Skeleton
        width={60}
        height={80}
        colorMode='light'
      />
      <Skeleton
        width={60}
        height={170}
        colorMode='light'
      />
      <Skeleton
        width={60}
        height={190}
        colorMode='light'
      />
      <Skeleton
        width={60}
        height={30}
        colorMode='light'
      />
      <Skeleton
        width={60}
        height={80}
        colorMode='light'
      />
    </MotiView>
  )
}
