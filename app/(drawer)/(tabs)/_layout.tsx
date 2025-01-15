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
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
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
