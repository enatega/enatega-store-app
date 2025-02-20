import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

export default function FormHeader({ title }: { title: string }) {
  // Hooks
  const { t } = useTranslation();
  return (
    <View className="w-full h-auto items-start self-start border-b-2 border-b-gray-300 p-3">
      <Text className="text-lg text-gray-400">{t(title)}</Text>
    </View>
  );
}
