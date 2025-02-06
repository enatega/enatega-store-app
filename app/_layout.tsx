/* eslint-disable @typescript-eslint/no-require-imports */
import { Appearance } from 'react-native'
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import 'react-native-reanimated'
import { ApolloProvider } from '@apollo/client'
// import * as Sentry from "sentry-expo";
import * as Sentry from '@sentry/react-native'

import { useColorScheme } from '@/lib/hooks/useColorScheme'

import FlashMessage from 'react-native-flash-message'

// Service
import setupApollo from '@/lib/apollo'

// Context
import { AuthProvider } from '@/lib/context/global/auth.context'
import { UserProvider } from '@/lib/context/global/user.context'
import { SoundProvider } from '@/lib/context/global/sound.context'
import { LocationProvider } from '@/lib/context/global/location.context'
import { ConfigurationProvider } from '@/lib/context/global/configuration.context'
// Service
import { initSentry } from '@/lib/utils/service'
// Locale
import '@/i18next'

// Style
import '../global.css'
import { useEffect } from 'react'

initSentry()

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

function RootLayout() {
  // Hooks
  const colorScheme = useColorScheme()
  const [loaded] = useFonts({
    SpaceMono: require('../lib/assets/fonts/SpaceMono-Regular.ttf'),
    Inter: require('../lib/assets/fonts/Inter.ttf'),
  })
  const client = setupApollo()

  // Use Effect
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  Appearance.setColorScheme('light') // Forces light mode

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
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
                      <Stack.Screen
                        name="webview"
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
  )
}

export default Sentry.wrap(RootLayout)
