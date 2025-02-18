// Icons
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

// Core
import { Text, View } from "react-native";

export default function NoRecordFound({
  msg = "No record found",
}: {
  msg?: string;
}) {
  const { t } = useTranslation();
  return (
    <View className="items-center flex flex-row my-24 justify-center">
      <Text className="font-bold text-center">{t(msg)}</Text>
      <Ionicons name="sad-outline" color={"indigo"} size={20} />
    </View>
  );
}
