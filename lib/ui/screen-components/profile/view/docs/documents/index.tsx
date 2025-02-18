// Hooks
import { useUserContext } from "@/lib/context/global/user.context";
import { router } from "expo-router";

// Core
import { Text, TouchableOpacity, View } from "react-native";

export default function DocumentsSection() {
  const { dataProfile } = useUserContext();
  return (
    <View className="flex flex-col h-[20%] w-full justify-between items-center">
      <View className="flex flex-col gap-3 items-start justify-center px-5 w-full border-b-2  border-b-gray-200 py-3">
        <View className="flex flex-row w-full justify-between items-start">
          <Text className="font-bold">Bank Details</Text>
          <TouchableOpacity
            className="top-6"
            onPress={() =>
              router.push("/(protected)/(tabs)/home/bank-management")
            }
          >
            <Text className="font-semibold text-[#0EA5E9]">
              {dataProfile?.bussinessDetails?.accountNumber ? "Update" : "Add"}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          className={`${dataProfile?.bussinessDetails?.accountNumber ? "bg-[#E0F2FE]" : "bg-[#FEE2E2]"} p-2 border rounded-3xl border-[#E0F2FE]`}
        >
          <Text
            className={`${dataProfile?.bussinessDetails?.accountNumber ? "text-[#0D99FF]" : "text-[#991B1B]"} font-semibold`}
          >
            {dataProfile?.bussinessDetails?.accountNumber
              ? "Submitted Data"
              : "Missing Data"}
          </Text>
        </View>
      </View>
      <View>
        <Text className="font-bold m-3">Other Details</Text>
        <View className="flex flex-row gap-3 items-center justify-between px-5 w-full border-b-2  border-b-gray-200 py-3">
          <Text>Address</Text>
          <Text>{dataProfile?.address}</Text>
        </View>
        <View className="flex flex-row gap-3 items-center justify-between px-5 w-full border-b-2  border-b-gray-200 py-3">
          <Text>Phone</Text>
          <Text>{dataProfile?.phone}</Text>
        </View>
        <View className="flex flex-row gap-3 items-center justify-between px-5 w-full border-b-2  border-b-gray-200 py-3">
          <Text>Password</Text>
          <Text>{dataProfile?.password}</Text>
        </View>
        <View className="flex flex-row gap-3 items-center justify-between px-5 w-full border-b-2  border-b-gray-200 py-3">
          <Text>Wallet Amount</Text>
          <Text>${dataProfile?.currentWalletAmount}</Text>
        </View>
      </View>
    </View>
  );
}
