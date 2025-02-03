/* eslint-disable @typescript-eslint/no-require-imports */
import { useEffect } from "react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { ApolloProvider } from "@apollo/client";

import { useColorScheme } from "@/lib/hooks/useColorScheme";

import FlashMessage from "react-native-flash-message";

// Service
import setupApollo from "@/lib/apollo";

// Context
import { AuthProvider } from "@/lib/context/global/auth.context";
import { UserProvider } from "@/lib/context/global/user.context";
import { SoundProvider } from "@/lib/context/global/sound.context";
import { LocationProvider } from "@/lib/context/global/location.context";
import { ConfigurationProvider } from "@/lib/context/global/configuration.context";

// Style
import "../global.css";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Hooks
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../lib/assets/fonts/SpaceMono-Regular.ttf"),
    Inter: require("../lib/assets/fonts/Inter.ttf"),
  });

  const client = setupApollo();

  // Use Effect
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <ApolloProvider client={client}>
        <ConfigurationProvider>
          <AuthProvider client={client}>
            <LocationProvider>
              <UserProvider>
                <SoundProvider>
                  <>
                    <Stack
                      screenOptions={{
                        headerShown: false,
                      }}
                    >
                      <Stack.Screen
                        name="login"
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="(tabs)"
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen name="+not-found" />
                      <Stack.Screen
                        name="order-detail"
                        options={{ headerShown: false }}
                      />

                      <Stack.Screen
                        name="chat"
                        options={{ headerShown: false }}
                      />
                    </Stack>

                    <StatusBar style="auto" />
                    <FlashMessage position="bottom" />
                  </>
                </SoundProvider>
              </UserProvider>
            </LocationProvider>
          </AuthProvider>
        </ConfigurationProvider>
      </ApolloProvider>
    </ThemeProvider>
  );
}
