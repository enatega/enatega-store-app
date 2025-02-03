import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerTitleAlign: "center",
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index" // This is the name of the page and must match the url from root
        options={{
          title: "Privacy Policy",
        }}
      />
    </Stack>
  );
}
