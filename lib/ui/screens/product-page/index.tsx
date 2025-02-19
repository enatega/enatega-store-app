import * as Linking from "expo-linking";
import { router } from "expo-router";
import { useLayoutEffect } from "react";

const index = () => {
  useLayoutEffect(() => {
    router.replace("/(protected)/(tabs)/home/orders/processing");
    Linking.openURL("https://ninjascode.com/terms-conditions");
  }, []);
  return <></>;
};

export default index;
