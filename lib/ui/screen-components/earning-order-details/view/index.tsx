// Contexts
import { useUserContext } from '@/lib/context/global/user.context'

// Interfaces
import { IRiderEarningsArray } from '@/lib/utils/interfaces/rider-earnings.interface'

// Core
import { View } from 'react-native'

// Components
import NoRecordFound from '@/lib/ui/useable-components/no-record-found'
import OrderStack from '../order-stack'

export default function EarningsOrderDetailsMain() {
  // Contexts
  const { riderOrderEarnings } = useUserContext()
  return (
    <View>
      {(riderOrderEarnings.length === 0) && (
        <NoRecordFound/>
      )}
      {riderOrderEarnings?.map(
        (earning: IRiderEarningsArray, index: number) => {
          return (
            <OrderStack
              key={index}
              amount={earning.totalEarnings}
              orderId={earning.orderDetails.orderId}
            />
          )
        },
      )}
    </View>
  )
}
