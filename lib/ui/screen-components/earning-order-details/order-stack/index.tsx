// Interfaces
import { IRiderEarningsOrderProps } from "@/lib/utils/interfaces/rider-earnings.interface";

// Core
import { Text, View } from "react-native";

export default function OrderStack({
  orderId,
  amount,
}: IRiderEarningsOrderProps) {
  return (
    <View className="border-b-2 border-b-gray-200 flex flex-row items-center justify-between p-3">
      <View className="flex flex-col gap-3 p-1 justify-center  float-start">
        <Text>
          Order ID #{orderId.slice(0, orderId.length - orderId.length / 2)}
        </Text>
        <Text>Payment</Text>
      </View>
      <View className="flex flex-col gap-3 p-1 justify-center  items-end">
        <Text className="bg-[#D1FAE5] rounded-xl p-1 text-[#065F46]">
          Completed
        </Text>
        <Text className="font-bold">${amount}</Text>
      </View>
    </View>
  );
}
