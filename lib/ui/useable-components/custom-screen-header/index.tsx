// Core
import { useTranslation } from "react-i18next";
import { View, Text } from "react-native";

export default function CustomScreenHeader({ title }: { title: string }) {
  // Hooks
  const { t } = useTranslation();

  return (
    <View className={`p-1 w-full mx-auto block justify-center items-center`}>
      <Text className="font-bold text-lg">{t(title)}</Text>
    </View>
  );
}
