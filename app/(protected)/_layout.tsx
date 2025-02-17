// Providers
import { SoundProvider } from "@/lib/context/global/sound.context";

// Expo
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

// React Native Flash Message
import FlashMessage from "react-native-flash-message";

export default function ProtectedLayout() {
  return (
    <SoundProvider>
      <>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="order-detail" options={{ headerShown: false }} />
          <Stack.Screen name="chat" options={{ headerShown: false }} />
        </Stack>

        <StatusBar style="auto" />
        <FlashMessage position="bottom" />
      </>
    </SoundProvider>
  );
}
