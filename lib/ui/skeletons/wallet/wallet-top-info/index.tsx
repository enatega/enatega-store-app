import { MotiView } from 'moti'
import { Skeleton } from 'moti/skeleton'
export default function WalletTopInfoSkeleton() {
  return (
    <MotiView
      transition={{
        type: 'timing',
      }}
      className='w-full  items-center justify-center gap-4 p-12 bg-red-500'
      animate={{ backgroundColor: '#ffffff' }}
    >
      <Skeleton
        colorMode={'light'}
        width={170}
      />
      <Skeleton
        colorMode={'light'}
        width={250}
      />
      <Skeleton
        colorMode={'light'}
        width={320}
        height={50}
        radius={100}
      />
    </MotiView>
  )
}
