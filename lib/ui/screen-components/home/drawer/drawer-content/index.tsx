// Core
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { useContext } from "react";
import { Text, View, TouchableOpacity } from "react-native";

// Context
import { AuthContext } from "@/lib/context/global/auth.context";

// Constants
import { Colors } from "@/lib/utils/constants";

import CustomDrawerHeader from "@/lib/ui/screen-components/home/drawer/drawer-header";

// UI-Componetns
import { LogoutIcon, RightArrowIcon } from "@/lib/ui/useable-components/svg";
import { useTranslation } from "react-i18next";

export default function CustomDrawerContent(
  props: DrawerContentComponentProps,
) {
  // Hooks
  const { t } = useTranslation();
  const { logout } = useContext(AuthContext);

  return (
    <DrawerContentScrollView
      {...props}
      scrollEnabled={false}
      contentContainerStyle={{
        paddingBottom: 0,
        paddingStart: 0,
        paddingEnd: 0,
        zIndex: 9999,
        position: "relative",
      }}
    >
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 50, // Only affects the top 20px
          backgroundColor: Colors.light.primary,
        }}
      />
      <CustomDrawerHeader />

      {/* Drawer Items with Right Arrow */}
      <View style={{ backgroundColor: "Colors.light.white" }}>
        {props.state.routes.map((route, index) => {
          const isFocused = props.state.index === index;
          const { options } = props.descriptors[route.key];

          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => props.navigation.navigate(route.name)}
              className="flex-row justify-between items-center px-4 py-3 border-b-[0.5px]"
              style={{
                backgroundColor: isFocused
                  ? Colors.light.lowOpacityPrimaryColor
                  : "",
                borderColor: Colors.light.borderLineColor,
              }}
            >
              {/* Left Icon and Label */}
              <View className="flex-row items-center gap-3">
                <View
                  className="h-[40px] w-[40px] rounded-full items-center justify-center"
                  style={{
                    backgroundColor: Colors.light.sidebarIconBackground,
                  }}
                >
                  {options.drawerIcon
                    ? options.drawerIcon({
                        color: Colors.light.black,
                        size: 16,
                        focused: true,
                      })
                    : null}
                </View>
                <Text className="text-sm font-semibold">
                  {(options.drawerLabel as string) ?? route.name}
                </Text>
              </View>

              {/* Right Arrow Icon */}
              <RightArrowIcon
                color={Colors.light.black}
                height={20}
                width={20}
              />
            </TouchableOpacity>
          );
        })}

        {/* Logout Button */}
        <TouchableOpacity
          onPress={logout}
          className="flex-row justify-between items-center px-4 py-3 border-b-[0.5px]"
          style={{ borderColor: Colors.light.borderLineColor }}
        >
          <View className="flex-row items-center gap-3">
            <View
              className="h-[40px] w-[40px] rounded-full items-center justify-center"
              style={{ backgroundColor: Colors.light.sidebarIconBackground }}
            >
              <LogoutIcon width={16} height={16} color={Colors.light.black} />
            </View>
            <Text className="text-sm font-semibold">{t("Logout")}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}
