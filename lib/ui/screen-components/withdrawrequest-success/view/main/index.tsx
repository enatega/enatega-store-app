import SuccessModal from "../success-modal";
import { View } from "react-native";

export default function WithdrawRquestSuccessMain() {
  // const [isModalVisible, setIsModalVisible] = useState(true)
  return (
    <View className="items-center justify-center h-full">
      <SuccessModal message="Your request for withdrawal has been submitted" />
    </View>
  );
}
