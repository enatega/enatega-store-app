import { Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-black">
      <TouchableOpacity className="bg-teal-500 p-3 rounded-lg">
        <Text className="text-white text-3xl font-bold">Settings</Text>
      </TouchableOpacity>

    </View>
  );
}
