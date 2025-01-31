import { MotiView } from 'moti'
import { Skeleton } from 'moti/skeleton'

export default function EarningStackSkeleton() {
  return (
    <MotiView className="flex flex-row justify-between items-center p-4 w-[95%] mx-auto my-2 border-b-gray-300 border-b-2 w">
      <MotiView className="flex flex-row gap-2 items-center flex-2">
        <Skeleton
          width={70}
          height={30}
          colorMode='light'
        />
        <Skeleton
          width={70}
          height={30}
          colorMode='light'
        />
      </MotiView>
      <MotiView>
        <Skeleton
          width={40}
          height={30}
          colorMode='light'
        />
      </MotiView>
    </MotiView>
  )
}
