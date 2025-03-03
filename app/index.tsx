import { Href, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";

// Constant
import useNotification from "@/lib/hooks/useNotification";
import { ROUTES, STORE_TOKEN } from "@/lib/utils/constants";

function App() {
  const router = useRouter();
  useNotification();

  // Handler
  const init = async () => {
    const token = await SecureStore.getItemAsync(STORE_TOKEN);
    if (token) {
      router.replace(ROUTES.home as Href);
    } else {
      router.replace(ROUTES.login as Href);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return <></>;
}

export default App;
