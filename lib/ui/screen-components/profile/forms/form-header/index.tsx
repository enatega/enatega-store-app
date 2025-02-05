import { Text, View } from "react-native";

export default function FormHeader({ title }: { title: string }) {
  return (
    <View className="w-full h-auto items-start self-start border-b-2 border-b-gray-300 p-3">
      <Text className="text-lg text-gray-400">{title}</Text>
    </View>
  );
}
