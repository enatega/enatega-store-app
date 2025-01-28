// Core
import React, { useState } from 'react';
import * as Location from 'expo-location'
import AsyncStorage from "@react-native-async-storage/async-storage";

// Interfaces§
import {
    IAuthContext,
    IAuthProviderProps,
} from '@/lib/utils/interfaces';
import { RIDER_TOKEN } from '@/lib/utils/constants';



export const AuthContext = React.createContext<
    IAuthContext
>({} as IAuthContext);

export const AuthProvider: React.FC<IAuthProviderProps> = ({
    client,
    children,
}) => {
    const [token, setToken] = useState<string>("");

    const setTokenAsync = async (token: string) => {
        await AsyncStorage.setItem(RIDER_TOKEN, token)
        client.clearStore()
        setToken(token)
    }

    const logout = async () => {
        try {
            client.clearStore()
            await AsyncStorage.removeItem(RIDER_TOKEN)

            setToken("")
            if (await Location.hasStartedLocationUpdatesAsync('RIDER_LOCATION')) {
                await Location.stopLocationUpdatesAsync('RIDER_LOCATION')
            }
        } catch (e) {
            console.log('Logout Error: ', e)
        }
    }


    const values: IAuthContext = {
        token: token ?? "",
        logout,
        setTokenAsync
    }


    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
};
