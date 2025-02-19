import { Href, useRouter } from "expo-router";
import { useEffect } from "react";

import * as SecureStore from "expo-secure-store";

// Constant
import { STORE_TOKEN, ROUTES } from "@/lib/utils/constants";
import useNotification from "@/lib/hooks/useNotification";
// Service

function App() {
  const router = useRouter();
  useNotification();

  // Handler
  const init = async () => {
    const token = await SecureStore.getItemAsync(STORE_TOKEN);
    if (token) {
      router.navigate(ROUTES.home as Href);
      return;
    }
    router.navigate(ROUTES.login as Href);
  };

  useEffect(() => {
    init();
  }, []);

  return <></>;
}

export default App;
