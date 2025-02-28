// Core
import { SafeAreaView } from "react-native";

// Components
import { useApptheme } from "@/lib/context/theme.context";
import ProfileHeader from "../../screen-components/profile/header";
import ProfileMain from "../../screen-components/profile/view/main";

export default function ComponentName() {
  // Hooks
  const { appTheme } = useApptheme();
  return (
    <SafeAreaView
      style={{
        backgroundColor: appTheme.screenBackground,
      }}
      className="h-full w-full"
    >
      <ProfileHeader />
      <ProfileMain />
    </SafeAreaView>
  );
}
