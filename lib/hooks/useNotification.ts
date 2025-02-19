import { useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

// API
import { SAVE_TOKEN, GET_RESTAURANT_BY_ID } from "@/lib/api/graphql";

export default function useNotification() {
  const { data } = useQuery(GET_RESTAURANT_BY_ID, {
    fetchPolicy: "network-only",
  });
  const [sendTokenToBackend, { loading }] = useMutation(SAVE_TOKEN);

  async function registerForPushNotificationsAsync() {
    if (!Device.isDevice) {
      alert("Must use physical device for Push Notifications");
    }
    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        sound: "default",
        lightColor: "#FF231F7C",
      });
    }
  }

  // Use Effect
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  return {
    getPermission: Notifications.getPermissionsAsync,
    requestPermission: Notifications.requestPermissionsAsync,
    getExpoPushToken: Notifications.getExpoPushTokenAsync,
    sendTokenToBackend,
    restaurantData: data,
    savingToken: loading,
  };
}
