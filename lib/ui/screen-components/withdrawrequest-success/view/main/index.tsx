import { View } from 'react-native'
import SuccessModal from '../success-modal'

export default function WithdrawRquestSuccessMain() {
  return (
    <View>
      <SuccessModal message="Your request for withdrawal has been submitted" />
    </View>
  )
}
