import * as Linking from "expo-linking";
import { router } from "expo-router";
import { useLayoutEffect } from "react";

const index = () => {
  useLayoutEffect(() => {
    router.replace("/(protected)/(tabs)/home/orders/processing");
    Linking.openURL("https://multivendor.enatega.com/#/");
  }, []);
  return <></>;
};

export default index;
