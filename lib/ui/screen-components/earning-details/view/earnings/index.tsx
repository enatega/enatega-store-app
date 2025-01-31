import { ScrollView, Text } from 'react-native'
import EarningStack from '../../../earnings/view/earnings-stack'
import {
  IRiderEarnings,
  IRiderEarningsResponse,
} from '@/lib/utils/interfaces/rider-earnings.interface'
import { QueryResult, useQuery } from '@apollo/client'
import { useUserContext } from '@/lib/context/global/user.context'
import { RIDER_EARNINGS_GRAPH } from '@/lib/apollo/queries/earnings.query'

export default function EarningsDetailStacks() {
  // Contexts
  const { userId, setModalVisible } = useUserContext()

  // Queries
  const { loading: isRiderEarningsLoading, data: riderEarningsData } = useQuery(
    RIDER_EARNINGS_GRAPH,
    {
      variables: {
        riderId: userId ?? '',
      },
    },
  ) as QueryResult<IRiderEarningsResponse | undefined, { riderId: string }>
  return (
    <ScrollView className="h-full border-t-2 border-t-gray-200 bg-white">
      {riderEarningsData?.riderEarningsGraph?.earnings?.length === 0 &&
        !isRiderEarningsLoading && (
          <Text className="block mx-auto font-bold text-center w-full my-12">
            No record found.
          </Text>
        )}
      {riderEarningsData?.riderEarningsGraph?.earnings?.length &&
        riderEarningsData?.riderEarningsGraph?.earnings?.map(
          (earning: IRiderEarnings, index) => (
            <EarningStack
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
