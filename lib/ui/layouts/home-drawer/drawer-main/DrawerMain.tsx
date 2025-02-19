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
import { TouchableOpacity } from "react-native";
import { DrawerActions } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import ScheduleIcon from "@/lib/ui/useable-components/svg/schedule";
import { useTranslation } from "react-i18next";

export default function DrawerMain() {
  // Hooks
  const { t } = useTranslation();
  return (
    <Drawer
      drawerContent={CustomDrawerContent}
      initialRouteName="orders"
      screenOptions={({ navigation }) => ({
        swipeEnabled: false,
        lazy: true,

        headerLeft: () => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer());
              }}
              style={{ marginLeft: 16 }}
            >
              <Ionicons name="menu" size={24} color="black" />
            </TouchableOpacity>
          );
        },
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
        drawerStyle: {
          marginBottom: 45,
        },
      })}
    >
      <Drawer.Screen
        name="orders"
        options={{
          drawerLabel: t("Home"),
          title: t("Orders"),
          drawerIcon: ({ color, size }) => (
            <HomeIcon color={color} height={size} width={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          drawerLabel: t("Profile"),
          title: t("Profile"),
          drawerIcon: ({ color, size }) => (
            <UserIcon color={color} height={size} width={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="work-schedule"
        options={{
          drawerLabel: t("Work Schedule"),
          title: t("Work Schedule"),
          drawerIcon: ({ color, size }) => (
            <ScheduleIcon color={color} height={size + 20} width={size + 20} />
          ),
        }}
      />
      <Drawer.Screen
        name="language"
        options={{
          drawerLabel: t("Language"),
          title: t("Language"),
          drawerIcon: ({ color, size }) => (
            <LanguageIcon color={color} height={size} width={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="product-page"
        options={{
          drawerLabel: t("Product Page"),
          title: t("Product Page"),
          drawerIcon: ({ color, size }) => (
            <PageIcon color={color} height={size} width={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="privacy-policy"
        options={{
          drawerLabel: t("Privacy Policy"),
          title: t("Privacy Policy"),
          drawerIcon: ({ color, size }) => (
            <PrivacyIcon color={color} height={size} width={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="bank-management"
        options={{
          drawerLabel: t("Bank Management"),
          title: t("Bank Management"),
          drawerIcon: ({ color, size }) => (
            <CardIcon color={color} height={size} width={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="about-us"
        options={{
          drawerLabel: t("About Us"),
          title: t("About US"),
          drawerIcon: ({ color, size }) => (
            <AboutIcon color={color} height={size} width={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="help"
        options={{
          drawerLabel: t("Help"),
          title: t("Help"),
          drawerIcon: ({ color, size }) => (
            <HelpIcon color={color} height={size} width={size} />
          ),
        }}
      />
    </Drawer>
  );
}
