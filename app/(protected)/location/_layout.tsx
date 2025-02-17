import { Colors } from "@/lib/utils/constants";
import { Stack } from "expo-router";
import { Platform } from "react-native";

export default function LoginLayour() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        // options={{
        //   title: "Order Detail",
        //   headerTitleAlign: "center",
        //   headerShadowVisible: false,
        // }}
      />
    </Stack>
  );
}
