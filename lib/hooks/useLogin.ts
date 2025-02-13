import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApolloError, useMutation, useQuery } from "@apollo/client";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import * as Device from "expo-device";
import { useContext, useState } from "react";

import { AuthContext } from "../context/global/auth.context";
import {
  DEFAULT_STORE_CREDS,
  STORE_LOGIN,
} from "../api/graphql/mutation/login";
import { Href, router } from "expo-router";
import { FlashMessageComponent } from "../ui/useable-components";
import { IStoreLoginCompleteResponse } from "../utils/interfaces/auth.interface";
import { ROUTES } from "../utils/constants";

const useLogin = () => {
  const [creds, setCreds] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Context
  const { setTokenAsync } = useContext(AuthContext);

  // API
  const [login, { data: storeLoginData }] = useMutation(STORE_LOGIN, {
    onCompleted,
    onError,
  });

  useQuery(DEFAULT_STORE_CREDS, { onCompleted, onError });

  // Handlers
  async function onCompleted({
    StoreLogin,
    lastOrderCreds,
  }: IStoreLoginCompleteResponse) {
    setIsLoading(false);
    if (StoreLogin) {
      await AsyncStorage.setItem("store-id", StoreLogin.restaurantId);
      await setTokenAsync(StoreLogin.token);
      router.replace(ROUTES.home as Href);
    } else if (
      lastOrderCreds &&
      lastOrderCreds?.restaurantUsername &&
      lastOrderCreds?.restaurantPassword
    ) {
      setCreds({
        username: lastOrderCreds?.restaurantUsername,
        password: lastOrderCreds?.restaurantPassword,
      });
    }
  }
  function onError(err:ApolloError) {
    const error = err as ApolloError
    setIsLoading(false);
    FlashMessageComponent({
      message:
        error?.graphQLErrors[0]?.message ??
        error?.networkError?.message ??
        "Something went wrong",
    });
  }
  const onLogin = async (username: string, password: string) => {
    try {
      setIsLoading(true);
      // Get notification permisssions
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
          }
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
      console.warn(storeLoginData.restaurantLogin?.restaurantId, data.restaurantLogin?.restaurantId ) 
      if  (storeLoginData.restaurantLogin?.restaurantId || data.restaurantLogin?.restaurantId ) {
        await AsyncStorage.setItem("store-id", data.restaurantLogin?.restaurantId);
        router.replace(ROUTES.home as Href);
      }
    } catch (err) {
      const error = err as ApolloError
      FlashMessageComponent({
        message:
          error?.graphQLErrors[0]?.message ??
          error?.networkError?.message ??
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
