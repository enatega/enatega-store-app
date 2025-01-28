import { Tabs } from "expo-router";
import { Platform } from "react-native";

import { HapticTab } from "@/lib/ui/useable-components/HapticTab";
import { IconSymbol } from "@/lib/ui/useable-components/IconSymbol";
import TabBarBackground from "@/lib/ui/useable-components/TabBarBackground";
import { Colors } from "@/lib/utils/constants/colors";
import { useColorScheme } from "@/lib/hooks/useColorScheme";

const RootLayout = () => {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].primary,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },

          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="discovery"
        options={{
          title: "Discovery",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
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
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default RootLayout;
