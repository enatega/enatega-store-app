import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{ headerTitle: "", headerBackButtonMenuEnabled: true }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerTitle: "Profile",
          headerBackButtonMenuEnabled: true,
        }}
      />
    </Stack>
  );
}
