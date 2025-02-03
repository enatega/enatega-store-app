// Core
import { ScrollView, Text } from 'react-native'

// Interfaces
import { IRiderEarnings } from '@/lib/utils/interfaces/rider-earnings.interface'
import { IRiderEarningsDetailProps } from '@/lib/utils/interfaces/earning.interface'

// Components
import EarningStack from '../../../earnings/view/earnings-stack'
import NoRecordFound from '@/lib/ui/useable-components/no-record-found'

export default function EarningsDetailStacks({
  riderEarningsData,
  isRiderEarningsLoading,
  setModalVisible,
}: IRiderEarningsDetailProps) {
  return (
    <ScrollView className="h-full border-t-2 border-t-gray-200 bg-white">
      <Text>
        {riderEarningsData?.riderEarningsGraph?.earnings?.length === 0 &&
          !isRiderEarningsLoading && <NoRecordFound />}
      </Text>
      {riderEarningsData?.riderEarningsGraph?.earnings?.length &&
        riderEarningsData?.riderEarningsGraph?.earnings?.map(
          (earning: IRiderEarnings, index) => (
            <EarningStack
              totalDeliveries={earning.totalDeliveries}
              date={earning.date}
              earning={earning.totalEarningsSum}
              _id={earning._id}
              tip={earning.totalTipsSum}
              earningsArray={earning.earningsArray}
              key={index}
              setModalVisible={setModalVisible}
            />
          ),
        )}
    </ScrollView>
  )
}
