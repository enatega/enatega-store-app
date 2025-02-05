import EarningBottomBar from "@/lib/ui/screen-components/earnings/view/bottom-bar";
import { Stack, usePathname } from "expo-router";
import { useUserContext } from "@/lib/context/global/user.context";

export default function StackLayout() {
  const { modalVisible, setModalVisible } = useUserContext();
  const pathname = usePathname();
  return (
    <>
      <Stack
        screenOptions={{
          headerTitle: pathname.startsWith("/earnings/earnings-detail")
            ? "Earnings Summary"
            : pathname.startsWith("/earnings/earnings-order-details")
              ? "Deliveries"
              : "Earnings",
          headerBackTitle: "",
          contentStyle: {
            backgroundColor: "white",
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{ headerShown: true, headerTitle: "Earnings Order Details" }}
        />
        <Stack.Screen
          name="(routes)"
          options={{
            headerShown: true,
            headerTitle: "Earnings Order Details",
            headerBackTitle: "Earnings",
          }}
        />
        {/* <Stack.Screen
          name="/(routes)/earnings-details"
          options={{ headerShown: true, headerTitle: "Earning Details" }}
        />*/}
      </Stack> 
      <EarningBottomBar
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        totalDeliveries={modalVisible.earningsArray.length || 0}
        totalEarnings={modalVisible.totalEarningsSum}
        totalTips={modalVisible.totalTipsSum}
      />
    </>
  );
}
