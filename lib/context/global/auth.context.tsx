// Core
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

// Interfaces§
import { IAuthContext, IAuthProviderProps } from "@/lib/utils/interfaces";
import { STORE_TOKEN } from "@/lib/utils/constants";
import { useRouter } from "expo-router";
import { FlashMessageComponent } from "@/lib/ui/useable-components";

export const AuthContext = React.createContext<IAuthContext>(
  {} as IAuthContext,
);

export const AuthProvider: React.FC<IAuthProviderProps> = ({
  client,
  children,
}) => {
  // Hooks
  const router = useRouter();

  // State
  const [token, setToken] = useState<string>("");
  const setTokenAsync = async (token: string) => {
    await SecureStore.setItemAsync(STORE_TOKEN, token);
    client.clearStore();
    setToken(token);
  };

  const logout = async () => {
    try {
      await Promise.all([
        client.clearStore(),
        SecureStore.deleteItemAsync(STORE_TOKEN),
        AsyncStorage.removeItem("store-id"),
      ]);

      setToken("");
      router.replace("/login");
    } catch (e) {
      FlashMessageComponent({
        message: `Logout failed`,
      });
      console.log("Logout Error: ", e);
    }
  };

  const values: IAuthContext = {
    token: token ?? "",
    logout,
    setTokenAsync,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
