import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQuery } from "@apollo/client";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import * as Device from "expo-device";
import { useContext, useState } from "react";
import { Dimensions } from "react-native";
import { AuthContext } from "../context/global/auth";
import {
  DEFAULT_RIDER_CREDS,
  RIDER_LOGIN,
} from "../api/graphql/mutation/login";
import { router } from "expo-router";
import { FlashMessageComponent } from "../ui/useable-components/flash-message";

const useLogin = () => {
  const [creds, setCreds] = useState({ username: "", password: "" });

  // Context
  const { setTokenAsync } = useContext(AuthContext);

  // API
  const [login] = useMutation(RIDER_LOGIN, {
    onCompleted,
    onError,
  });

  useQuery(DEFAULT_RIDER_CREDS, { onCompleted, onError });

  // Handlers
  async function onCompleted({ riderLogin, lastOrderCreds }) {
    if (riderLogin) {
      FlashMessageComponent({ message: "Logged in" });
      await AsyncStorage.setItem("rider-id", riderLogin.userId);
      // await setTokenAsync(riderLogin.token);
      router.replace("/(drawer)/(tabs)/discovery");
    } else if (
      lastOrderCreds &&
      lastOrderCreds.riderUsername &&
      lastOrderCreds.riderPassword
    ) {
      setCreds({
        username: lastOrderCreds.riderUsername,
        password: lastOrderCreds.riderPassword,
      });
    }
  }
  function onError(err) {
    FlashMessageComponent({
      message:
        err?.graphQLErrors[0]?.message ??
        err?.networkError?.message ??
        "Something went wrong",
    });
  }

  const onLogin = async (username: string, password: string) => {
    try {
      const settings = await Notifications.getPermissionsAsync();
      let notificationPermissions = { ...settings };

      // Request notification permissions if not granted or not provisional on iOS
      if (
        settings?.status !== "granted" ||
        settings.ios?.status !==
          Notifications.IosAuthorizationStatus.PROVISIONAL
      ) {
        notificationPermissions = await Notifications.requestPermissionsAsync({
          ios: {
            allowProvisional: true,
            allowAlert: true,
            allowBadge: true,
            allowSound: true,
            //   allowAnnouncements: true
          },
        });
      }

      let notificationToken = null;
      // Get notification token if permissions are granted and it's a device
      if (
        (notificationPermissions?.status === "granted" ||
          notificationPermissions.ios?.status ===
            Notifications.IosAuthorizationStatus.PROVISIONAL) &&
        Device.isDevice
      ) {
        notificationToken = (
          await Notifications.getExpoPushTokenAsync({
            projectId: Constants.expoConfig?.extra?.eas.projectId,
          })
        ).data;
      }

      // Perform mutation with the obtained data
      login({
        variables: {
          username: username.toLowerCase(),
          password: password,
          notificationToken: notificationToken,
        },
      });
    } catch (err) {
      console.log({ wrong: err });

      FlashMessageComponent({
        message:
          err?.graphQLErrors[0]?.message ??
          err?.networkError?.message ??
          "Something went wrong",
      });
    }
  };

  return {
    creds,
    onLogin,
  };
};
export default useLogin;
