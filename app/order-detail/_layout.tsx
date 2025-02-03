import { Colors } from "@/lib/utils/constants";
import { Stack } from "expo-router";
import { Platform } from "react-native";

export default function OrderDetailLayour() {
  return (
    <Stack
      screenOptions={{
        headerStyle: Platform.select({
          ios: {
            position: "absolute",
          },

          default: {
            position: "absolute",
            backgroundColor: Colors.light.white,
            elevation: 0, // Shadow for Android
            shadowColor: "white", // Shadow for iOS
            shadowOpacity: 0,
            shadowRadius: 0,
          },
        }),
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Order Detail",
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}
