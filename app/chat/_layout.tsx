import { Colors } from "@/lib/utils/constants";
import { Stack } from "expo-router";
import { Platform, Text, View } from "react-native";

export default function LoginLayour() {
  return (
    <Stack
      screenOptions={{
        headerStyle: Platform.select({
          ios: {
            position: "absolute",
            backgroundColor: Colors.light.white,
            elevation: 0, // Shadow for Android
            shadowColor: "white", // Shadow for iOS
            shadowOpacity: 0,
            shadowRadius: 0,
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
          headerShown: false,
          title: "Chat",
          headerTitleAlign: "center",
          headerBackVisible: true,
          headerBackTitle: "Back",
        }}
      />
    </Stack>
  );
}
