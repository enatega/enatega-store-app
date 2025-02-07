import * as Linking from "expo-linking";
import { useLayoutEffect } from "react";
import { router } from "expo-router";

const index = () => {
  useLayoutEffect(() => {
    router.replace("/(tabs)/home/orders/processing");
    Linking.openURL("https://multivendor.enatega.com/#/privacy");
  }, []);
  return <></>;
};

export default index;
