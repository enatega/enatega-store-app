// Components
import SuccessModal from "../success-modal";

// Core
import { View } from "react-native";

export default function WithdrawRquestSuccessMain() {
  return (
    <View className="items-center justify-center h-full">
      <SuccessModal message="Your request for withdrawal has been submitted" />
    </View>
  );
}
