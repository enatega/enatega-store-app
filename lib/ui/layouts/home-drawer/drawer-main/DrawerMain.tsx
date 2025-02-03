import { Drawer } from "expo-router/drawer";
import { Colors } from "@/lib/utils/constants";
import CustomDrawerContent from "@/lib/ui/screen-components/home/drawer/drawer-content";
import {
  LanguageIcon,
  UserIcon,
  HomeIcon,
  AboutIcon,
  CardIcon,
  HelpIcon,
  PrivacyIcon,
  PageIcon,
} from "@/lib/ui/useable-components/svg";

export default function DrawerMain() {
  return (
    <Drawer
      drawerContent={CustomDrawerContent}
      screenOptions={{
        drawerHideStatusBarOnOpen: true,
        drawerActiveBackgroundColor: Colors.light.lowOpacityPrimaryColor,
        drawerActiveTintColor: Colors.light.mainTextColor,
        headerShadowVisible: false,
        headerTitleAlign: "center",
        drawerStatusBarAnimation: "slide",
        drawerItemStyle: {
          borderRadius: 0,
          marginTop: 4,
        },
      }}
    >
      <Drawer.Screen
        name="orders"
        options={{
          drawerLabel: "Home",
          title: "Orders",
          drawerIcon: ({ color, size }) => (
            <HomeIcon color={color} height={size} width={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          drawerLabel: "Profile",
          title: "Profile",
          drawerIcon: ({ color, size }) => (
            <UserIcon color={color} height={size} width={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="language"
        options={{
          drawerLabel: "Language",
          title: "Language",
          drawerIcon: ({ color, size }) => (
            <LanguageIcon color={color} height={size} width={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="product-page"
        options={{
          drawerLabel: "Product Page",
          title: "Product Page",
          drawerIcon: ({ color, size }) => (
            <PageIcon color={color} height={size} width={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="privacy-policy"
        options={{
          drawerLabel: "Privacy Policy",
          title: "Privacy Policy",
          drawerIcon: ({ color, size }) => (
            <PrivacyIcon color={color} height={size} width={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="bank-management"
        options={{
          drawerLabel: "Bank Management",
          title: "Bank Management",
          drawerIcon: ({ color, size }) => (
            <CardIcon color={color} height={size} width={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="about-us"
        options={{
          drawerLabel: "About Us",
          title: "About US",
          drawerIcon: ({ color, size }) => (
            <AboutIcon color={color} height={size} width={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="help"
        options={{
          drawerLabel: "Help",
          title: "Help",
          drawerIcon: ({ color, size }) => (
            <HelpIcon color={color} height={size} width={size} />
          ),
        }}
      />
      <Drawer initialRouteName="/home/orders" />
    </Drawer>
  );
}
