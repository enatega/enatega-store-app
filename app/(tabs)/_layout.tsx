import { Tabs } from "expo-router";
import { Platform } from "react-native";

import { HapticTab } from "@/lib/ui/useable-components/HapticTab";
import TabBarBackground from "@/lib/ui/useable-components/TabBarBackground";
import { Colors } from "@/lib/utils/constants/colors";
import { useColorScheme } from "@/lib/hooks/useColorScheme";
import { HomeIcon } from "@/lib/ui/useable-components/svg";
import WalletIcon from "@/lib/ui/useable-components/svg/wallet";
import CurrencyIcon from "@/lib/ui/useable-components/svg/currency";
import PersonIcon from "@/lib/ui/useable-components/svg/person";

const RootLayout = () => {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "dark"].primary,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",

            backgroundColor: "#1F2937",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderTopWidth: 0.5, // Optional border at the top
            shadowColor: "#000", // Shadow for iOS
            shadowOffset: { width: 0, height: -5 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
          },
          android: {
            position: "absolute",

            backgroundColor: "#1F2937",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderTopWidth: 0.5, // Optional border at the top
            elevation: 5, // Shadow for Android
            shadowOffset: { width: 0, height: -5 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
          },
        }),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            // <IconSymbol size={28} name="home" color={color} />
            <HomeIcon color={color} width={25} height={25} />
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: "Wallet",
          tabBarIcon: ({ color }) => (
            <WalletIcon color={color} width={25} height={25} />
          ),
        }}
      />
      <Tabs.Screen
        name="earnings"
        options={{
          title: "Earnings",
          tabBarIcon: ({ color }) => (
            <CurrencyIcon color={color} width={25} height={25} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <PersonIcon color={color} width={25} height={25} />
          ),
        }}
      />
    </Tabs>
  );
};

export default RootLayout;
