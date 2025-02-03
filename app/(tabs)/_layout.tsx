import { Tabs, usePathname } from "expo-router";
import { Platform } from "react-native";

import { HapticTab } from "@/lib/ui/useable-components/HapticTab";
import { IconSymbol } from "@/lib/ui/useable-components/IconSymbol";
import TabBarBackground from "@/lib/ui/useable-components/TabBarBackground";
import { Colors } from "@/lib/utils/constants/colors";
import { useColorScheme } from "@/lib/hooks/useColorScheme";
import { useEffect, useState } from "react";

const RootLayout = () => {
  const [tabKey, setTabKey] = useState(1);
  const colorScheme = useColorScheme();
  const pathName = usePathname();
  useEffect(() => {
    if (pathName.startsWith("/wallet/success")) {
      setTabKey((prev) => prev + 1); // Force a re-render of the tab bar
    }
  }, [pathName]);
  return (
    <Tabs
      key={tabKey}
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].primary,
        headerShown: false,
        tabBarButton: HapticTab,

        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },

          default: {
            position: "absolute",
            display: pathName.startsWith("/wallet/success") ? "none" : "flex",
            backgroundColor: Colors.light.tabNaviatorBackground,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderTopWidth: 0.5, // Optional border at the top
            elevation: 5, // Shadow for Android
            shadowColor: "#000", // Shadow for iOS
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
            <IconSymbol size={28} name="house" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: "Wallet",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="wallet.pass.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="earnings"
        options={{
          title: "Earnings",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="dollarsign.circle" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person" color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default RootLayout;
