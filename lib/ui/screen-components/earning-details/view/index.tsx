// Core
import { View } from 'react-native'

// Interfaces
import { IRiderEarningsResponse } from '@/lib/utils/interfaces/rider-earnings.interface'

// Hooks
import { useUserContext } from '@/lib/context/global/user.context'
import { QueryResult, useQuery } from '@apollo/client'

// GraphQL
import { RIDER_EARNINGS_GRAPH } from '@/lib/apollo/queries/earnings.query'

// Components
import EarningDetailsHeader from '../header'
import EarningsDetailStacks from './earnings'

export default function EarningDetailsMain() {
  // Contexts
  const {setModalVisible, userId } = useUserContext()

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
    <View>
      <EarningDetailsHeader />
      <EarningsDetailStacks
        isRiderEarningsLoading={isRiderEarningsLoading}
        riderEarningsData={riderEarningsData}
        setModalVisible={setModalVisible}
      />
      
    </View>
  )
}
