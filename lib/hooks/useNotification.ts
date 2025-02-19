import { useCallback, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import AsyncStorage from "@react-native-async-storage/async-storage";

// API
import { SAVE_TOKEN, GET_RESTAURANT_BY_ID } from "@/lib/api/graphql";

export default function useNotification() {
  const { data } = useQuery(GET_RESTAURANT_BY_ID, {
    fetchPolicy: "network-only",
  });
  const [sendTokenToBackend, { loading }] = useMutation(SAVE_TOKEN);

  // Notification Handler
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

  const registerForPushNotification = async () => {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus === "granted") {
      Notifications.setNotificationHandler({
        handleNotification: async () => {
          return {
            shouldShowAlert: false, // Prevent the app from closing
            shouldPlaySound: true,
            shouldSetBadge: false,
          };
        },
      });
    }
  };

  const handleNotification = useCallback(
    async (response: Notifications.NotificationResponse) => {
      if (
        response &&
        response.notification &&
        response.notification.request &&
        response.notification.request.content &&
        response.notification.request.content.data
      ) {
        const { _id } = response.notification.request.content.data;
        // const { data } = await client.query({
        //   query: STORE_ORDERS,
        //   fetchPolicy: "network-only",
        // });
        // const order = data.riderOrders.find((o: IOrder) => o._id === _id);
        const lastNotificationHandledId = await AsyncStorage.getItem(
          "@lastNotificationHandledId"
        );
        if (lastNotificationHandledId === _id) return;
        await AsyncStorage.setItem("@lastNotificationHandledId", _id);
        // router.navigate("/order-detail");
        // router.setParams({ itemId: _id, order });
      }
    },
    []
  );

  // Use Effect
  useEffect(() => {
    const subscription =
      Notifications.addNotificationResponseReceivedListener(handleNotification);

    return () => subscription.remove();
  }, [handleNotification]);

  useEffect(() => {
    registerForPushNotification();
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
