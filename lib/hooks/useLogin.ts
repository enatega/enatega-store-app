import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQuery } from "@apollo/client";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import * as Device from "expo-device";
import { useContext, useState } from "react";

import { AuthContext } from "../context/global/auth.context";
import {
  DEFAULT_RIDER_CREDS,
  RIDER_LOGIN,
} from "../api/graphql/mutation/login";
import { Href, router } from "expo-router";
import { FlashMessageComponent } from "../ui/useable-components/flash-message";
import { IRiderLoginCompleteResponse } from "../utils/interfaces/auth.interface";
import { ROUTES } from "../utils/constants";

const useLogin = () => {
  const [creds, setCreds] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Context
  const { setTokenAsync } = useContext(AuthContext);

  // API
  const [login, { data: riderLoginData }] = useMutation(RIDER_LOGIN, {
    onCompleted,
    onError,
  });

  useQuery(DEFAULT_RIDER_CREDS, { onCompleted, onError });

  // Handlers
  async function onCompleted({
    riderLogin,
    lastOrderCreds,
  }: IRiderLoginCompleteResponse) {
    setIsLoading(false);
    if (riderLogin) {
      await AsyncStorage.setItem("rider-id", riderLogin.userId);
      await setTokenAsync(riderLogin.token);
      router.replace(ROUTES.home as Href);
    } else if (
      lastOrderCreds &&
      lastOrderCreds?.riderUsername &&
      lastOrderCreds?.riderPassword
    ) {
      setCreds({
        username: lastOrderCreds?.riderUsername,
        password: lastOrderCreds?.riderPassword,
      });
    }
  }
  function onError(err) {
    setIsLoading(false);
    FlashMessageComponent({
      message:
        err?.graphQLErrors[0]?.message ??
        err?.networkError?.message ??
        "Something went wrong",
    });
  }

  const onLogin = async (username: string, password: string) => {
    try {
      setIsLoading(true);
      // Get notification permissions
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
      const { data } = await login({
        variables: {
          username: username.toLowerCase(),
          password: password,
          notificationToken: notificationToken,
        },
      });

      if (riderLoginData?.userId) {
        await AsyncStorage.setItem("rider-id", data.userId);
      }
    } catch (err) {
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
    isLogging: isLoading,
  };
};
export default useLogin;
