import { CustomContinueButton } from "@/lib/ui/useable-components";
import { Text, View } from "react-native";
import RecentTransaction from "../recent-transactions";

export default function WalletMain() {
  return (
    <View className="flex flex-col gap-4">
      <View className="flex flex-column gap-4 items-center bg-[#F3F4F6]">
        <Text className="text-[16px] text-[#4B5563] font-[600]">
          Current Balance
        </Text>
        <Text className="font-semibold text-[32px]">$250</Text>
        <CustomContinueButton title="Withdraw Now" />
      </View>
      <RecentTransaction />
    </View>
  );
}
