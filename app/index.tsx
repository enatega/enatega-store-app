import { RIDER_TOKEN } from "@/lib/utils/constants";
import { ROUTES } from "@/lib/utils/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Href, useRouter } from "expo-router";
import { useEffect } from "react";

export default function App() {
  const router = useRouter();

  // Handler
  const init = async () => {
    const token = await AsyncStorage.getItem(RIDER_TOKEN);
    if (token) {
      router.navigate(ROUTES.home as Href);
      return;
    }
    router.navigate(ROUTES.login as Href);
  };

  useEffect(() => {
    init();
  }, []);

  // return <Redirect href="/(tabs)/home/orders" />;
  // return <Redirect href="/login" />;
  return <></>;
}
