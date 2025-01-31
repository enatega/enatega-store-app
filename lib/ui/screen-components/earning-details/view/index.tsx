import { View } from 'react-native'
import EarningsDetailStacks from './earnings'
import EarningDetailsHeader from '../header'

export default function EarningDetailsMain() {
 

  return (
    <View>
      <EarningDetailsHeader/>
      <EarningsDetailStacks/>
    </View>
  )
}
