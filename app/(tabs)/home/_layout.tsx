import { AuthContext } from "@/lib/context/global/auth.context";
import { Colors } from "@/lib/utils/constants";
import { FontAwesome } from "@expo/vector-icons";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { DrawerItemList } from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";
import { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";

function CustomDrawerContent(props) {
  const { logout } = useContext(AuthContext);
  return (
    <View className="flex-1 pb-16">
      {/* Default Drawer Items */}
      {/* Scrollable Drawer Items */}
      <DrawerContentScrollView {...props} className="flex-1">
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      {/* Footer Section */}
      <TouchableOpacity onPress={logout}>
        <View className="ml-4 flex-row items-center gap-x-2">
          <FontAwesome name="sign-out" size={25} />
          <Text className="text-center text-gray-500 text-lg">Logout</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default function Layout() {
  return (
    <Drawer
      screenOptions={{
        headerShadowVisible: false,
        headerTitleAlign: "center",
        drawerActiveTintColor: Colors.light.primary,
        drawerStatusBarAnimation: "fade",
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="orders" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: "Home",
          title: "Orders",
        }}
      />
      <Drawer.Screen
        name="profile" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: "Profile",
          title: "Profile",
        }}
      />
    </Drawer>
  );
}
