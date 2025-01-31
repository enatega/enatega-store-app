import { MotiView } from 'moti'
import EarningHeadingSkeleton from './earning-heading'
import EarningTopChartSkeleton from './earning-top-chart'
import EarningStackSkeleton from './earning-stack'

export default function EarningScreenMainLoading() {
  return (
    <MotiView className='flex flex-col justify-between items-center'>
      <EarningTopChartSkeleton />
      <EarningHeadingSkeleton />
      <MotiView>
        {[...Array(5)].map((_, index) => (
          <EarningStackSkeleton key={index} />
        ))}
      </MotiView>
    </MotiView>
  )
}
