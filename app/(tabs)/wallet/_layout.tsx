import { Stack } from "expo-router";

export default function StackLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: true, headerTitle: "Wallet" }}
      />
      <Stack.Screen
        name="(routes)/success"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
