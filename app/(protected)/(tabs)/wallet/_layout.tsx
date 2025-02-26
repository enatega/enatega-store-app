import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";

export default function StackLayout() {
  const { t } = useTranslation();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: true, headerTitle: t("Wallet") }}
      />
      <Stack.Screen
        name="(routes)/success"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
