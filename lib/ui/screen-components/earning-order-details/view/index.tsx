import { useUserContext } from '@/lib/context/global/user.context'
import {IRiderEarningsArray } from '@/lib/utils/interfaces/rider-earnings.interface'
import { Text, View } from 'react-native'
import OrderStack from '../order-stack'

export default function EarningsOrderDetailsMain() {
  const { riderOrderEarnings } = useUserContext()
  return (
    <View>
     {
        riderOrderEarnings?.map((earning:IRiderEarningsArray, index:number)=>{
            return(
                <OrderStack key={index} amount={earning.totalEarnings} orderId={earning.orderDetails.orderId} />
            )
        })
     }
    </View>
  )
}
