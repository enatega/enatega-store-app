// Interfaces
import { useApptheme } from "@/lib/context/theme.context";
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
  totalOrderAmount,
  totalDeliveries,
}: IEarningStackProps) {
  // Hooks
  const { appTheme } = useApptheme();
  const { t } = useTranslation();

  // Handlers
  function handleForwardPress() {
    setModalVisible({
      bool: true,
      _id: _id,
      date: date,
      earningsArray: earningsArray,
      totalEarningsSum: earning,
      totalDeliveries: totalDeliveries,
      totalOrderAmount: totalOrderAmount,
    });
  }
  return (
    <View className="flex flex-row justify-between items-center p-4 w-[95%] mx-auto my-3 border-b-gray-300 border-b-2">
      <View className="flex flex-row gap-2 items-center flex-1">
        <Text style={{ color: appTheme.fontSecondColor }}>{date}</Text>
        <Text style={{ color: appTheme.fontMainColor }} className="font-bold">
          {t("Total Earnings")}
        </Text>
      </View>
      <TouchableOpacity
        className="flex flex-row gap-2 items-center flex-1"
        onPress={handleForwardPress}
        accessibilityRole="button"
        accessibilityLabel={`View details for earnings on ${date}`}
      >
        <Text style={{ color: appTheme.fontMainColor }} className="font-bold">
          ${earning}
        </Text>
        <Ionicons
          name="arrow-forward"
          size={23}
          color={appTheme.fontMainColor}
        />
      </TouchableOpacity>
    </View>
  );
}
