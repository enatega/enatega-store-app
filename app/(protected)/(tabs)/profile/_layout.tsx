import { useApptheme } from "@/lib/context/theme.context";
import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";

export default function ProfileLayout() {
  // Hooks
  const { t } = useTranslation();
  const { appTheme } = useApptheme();
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: appTheme.screenBackground,
        },
        headerTitleStyle: {
          color: appTheme.fontMainColor,
        },
        headerBackButtonMenuEnabled: true,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerTitle: t("Profile"),
          headerBackButtonMenuEnabled: true,
        }}
      />
    </Stack>
  );
}
