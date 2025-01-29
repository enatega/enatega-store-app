/* eslint-disable @typescript-eslint/no-require-imports */
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/lib/hooks/useColorScheme";

import "../global.css";
import { ConfigurationProvider } from "@/lib/context/global/configuration.context";
import { ApolloProvider } from "@apollo/client";
import setupApollo from "@/lib/apollo";
import FlashMessage from "react-native-flash-message";
import { AuthProvider } from "@/lib/context/global/auth.context";
import { LocationProvider } from "@/lib/context/global/location.context";
import { UserProvider } from "@/lib/context/global/user.context";
import { Colors } from "@/lib/utils/constants";
import { Platform } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
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
                <>
                  <Stack>
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
                  </Stack>

                  <StatusBar style="auto" />
                  <FlashMessage position="bottom" />
                </>
              </UserProvider>
            </LocationProvider>
          </AuthProvider>
        </ConfigurationProvider>
      </ApolloProvider>
    </ThemeProvider>
  );
}
