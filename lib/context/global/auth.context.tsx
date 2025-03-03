// Apollo
import { loadDevMessages, loadErrorMessages } from "@apollo/client/dev";

// Core
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";

// Interfaces§
import { STORE_TOKEN } from "@/lib/utils/constants";
import { IAuthContext, IAuthProviderProps } from "@/lib/utils/interfaces";
import { router } from "expo-router";

export const AuthContext = React.createContext<IAuthContext>(
  {} as IAuthContext,
);

export const AuthProvider: React.FC<IAuthProviderProps> = ({
  client,
  children,
}) => {
  // State
  const [token, setToken] = useState<string>("");
  const setTokenAsync = async (token: string) => {
    await SecureStore.setItemAsync(STORE_TOKEN, token);
    client.clearStore();
    setToken(token);
  };

  const logout = async () => {
    try {
      client.stop();
      await Promise.all([
        client.clearStore(),
        SecureStore.deleteItemAsync(STORE_TOKEN),
        AsyncStorage.removeItem("store-id"),
      ]);

      setToken("");
      router.replace("/(un-protected)/login");
    } catch (e) {
      // FlashMessageComponent({
      //   message: `Logout failed`,
      // });
      console.error("Logout Error: ", { e });
    }
  };
  async function checkAuth() {
    try {
      const token = await SecureStore.getItemAsync(STORE_TOKEN);
      const storeId = await AsyncStorage.getItem("store-id");

      if (!storeId || !token) {
        return await logout();
      }
      setToken(token);
    } catch (error) {
      console.error("error getting store id & token", error);
      await logout();
    }
  }
  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (__DEV__) {
      loadDevMessages();
      loadErrorMessages();
    }
  }, []);

  const values: IAuthContext = {
    token: token ?? "",
    logout,
    setTokenAsync,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
