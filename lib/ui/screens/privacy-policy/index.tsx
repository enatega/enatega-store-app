import * as Linking from "expo-linking";
import { useLayoutEffect } from "react";
import { router } from "expo-router";

const index = () => {
  useLayoutEffect(() => {
    router.replace("/(tabs)/home/orders/processing");
    Linking.openURL("https://ninjascode.com/privacy-policy");
  }, []);
  return <></>;
};

export default index;
