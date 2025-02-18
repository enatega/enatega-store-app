/* eslint-disable @typescript-eslint/no-require-imports */
// Core
import { Appearance } from 'react-native'
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import * as SplashScreen from 'expo-splash-screen'
import 'react-native-reanimated'

// import * as Sentry from "sentry-expo";
import * as Sentry from '@sentry/react-native'

// Service
import setupApollo from '@/lib/apollo'

// Providers
import { AuthProvider } from '@/lib/context/global/auth.context'
import { LocationProvider } from '@/lib/context/global/location.context'
import { ConfigurationProvider } from '@/lib/context/global/configuration.context'
import { ApolloProvider } from '@apollo/client'

// Service
import { initSentry } from '@/lib/utils/service'

// Locale
import '@/i18next'

// Style
import '../global.css'

// Hooks
import { useColorScheme } from '@/lib/hooks/useColorScheme'
import { useFonts } from 'expo-font'
import { UserProvider } from '@/lib/context/global/user.context'
import { useEffect } from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import FlashMessage from 'react-native-flash-message'

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
                <Stack
                  initialRouteName="(un-protected)"
                  screenOptions={{ headerShown: false }}
                >
                  <Stack.Screen name="+not-found" />
                  <Stack.Screen
                    name="(protected)"
                    options={{
                      headerShown: false,
                      presentation: 'fullScreenModal',
                    }}
                  />
                  <Stack.Screen
                    name="(un-protected)"
                    options={{ headerShown: false }}
                  />
                </Stack>
              </UserProvider>
              <StatusBar style="auto" />
              <FlashMessage position="bottom" />
            </LocationProvider>
          </AuthProvider>
        </ConfigurationProvider>
      </ApolloProvider>
    </ThemeProvider>
  )
}

export default Sentry.wrap(RootLayout)
