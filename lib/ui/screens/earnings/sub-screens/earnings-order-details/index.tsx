// Components
import { useApptheme } from "@/lib/context/theme.context";
import EarningsOrderDetailsMain from "@/lib/ui/screen-components/earning-order-details/view";

// Core
import { SafeAreaView } from "react-native";

export default function EarningsOrderDetailsScreen() {
  // Hooks
  const { appTheme } = useApptheme();
  return (
    <SafeAreaView style={{ backgroundColor: appTheme.themeBackground }}>
      <EarningsOrderDetailsMain />
    </SafeAreaView>
  );
}
