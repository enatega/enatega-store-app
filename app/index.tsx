import { useLocationContext } from "@/lib/context/global/location.context";
import { RIDER_TOKEN } from "@/lib/utils/constants";
import { ROUTES } from "@/lib/utils/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Href, useRouter } from "expo-router";
import { useEffect } from "react";

export default function App() {
  const router = useRouter();
  const { locationPermission } = useLocationContext();

  // Handler
  const init = async () => {
    const token = await AsyncStorage.getItem(RIDER_TOKEN);
    if (token) {
      if (!locationPermission) {
        router.navigate(ROUTES.location as Href);
        return;
      }

      router.navigate(ROUTES.home as Href);
      return;
    }
    router.navigate(ROUTES.login as Href);
  };

  useEffect(() => {
    init();
  }, [locationPermission]);

  // return <Redirect href="/(tabs)/home/orders" />;
  // return <Redirect href="/login" />;
  return <></>;
}
