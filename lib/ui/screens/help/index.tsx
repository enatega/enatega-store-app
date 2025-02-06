import * as Linking from "expo-linking";
import { router } from "expo-router";
import { useLayoutEffect } from "react";

const HelpScreen = () => {
  useLayoutEffect(() => {
    router.replace("/(tabs)/home/orders/processing");
    Linking.openURL("https://ninjascode.com");
  }, []);
  return <></>;
};

export default HelpScreen;
