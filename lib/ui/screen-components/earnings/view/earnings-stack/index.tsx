// Interfaces
import { IEarningStackProps } from "@/lib/utils/interfaces/earning.interface";

// Icons
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

// Core
import { Text, TouchableOpacity, View } from "react-native";

export default function EarningStack({
  date,
  earning,
  setModalVisible,
  _id,
  earningsArray,
  tip,
  totalDeliveries,
}: IEarningStackProps) {
  // Hooks
  const { t } = useTranslation();

  // Handlers
  function handleForwardPress() {
    setModalVisible({
      bool: true,
      _id: _id,
      date: date,
      earningsArray: earningsArray,
      totalTipsSum: tip,
      totalEarningsSum: earning,
      totalDeliveries: totalDeliveries,
    });
  }
  return (
    <View className="flex flex-row justify-between items-center p-4 w-[95%] mx-auto my-3 border-b-gray-300 border-b-2">
      <View className="flex flex-row gap-2 items-center flex-2">
        <Text>{date}</Text>
        <Text className="font-bold">{t("Total Earning")}</Text>
      </View>
      <TouchableOpacity
        className="flex flex-row gap-2 items-center flex-2"
        onPress={handleForwardPress}
      >
        <Text className="font-bold">${earning}</Text>
        <Ionicons name="arrow-forward" size={23} />
      </TouchableOpacity>
    </View>
  );
}
