import React, { useEffect } from "react";
import { View, Linking, Alert, Text, TouchableOpacity } from "react-native";
import * as Location from "expo-location";
import { useLocationContext } from "@/lib/context/global/location.context";

const LocationPermissions = () => {
  const { setLocationPermission } = useLocationContext();

  const getLocationPermission = async () => {
    const { status } = await Location.getForegroundPermissionsAsync();
    if (status === "granted") {
      setLocationPermission(true);
    }
  };

  const LocationAlert = async () => {
    Alert.alert(
      "Location access",
      "Location permissions are required to use this app. Kindly open settings to allow location access.",
      [
        {
          text: "Open settings",
          onPress: async () => {
            await Linking.openSettings();
          },
        },
      ],
    );
    const { status } = await Location.getForegroundPermissionsAsync();
    if (status === "granted") {
      setLocationPermission(true);
    }
  };

  const askLocationPermission = async () => {
    const { status, canAskAgain } =
      await Location.getForegroundPermissionsAsync();
    if (status === "granted") {
      setLocationPermission(true);
    }
    if (canAskAgain) {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        setLocationPermission(true);
      } else {
        LocationAlert();
      }
    } else {
      LocationAlert();
    }
  };

  useEffect(() => {
    getLocationPermission();
  }, []);

  return (
    <View className="flex-1 items-center justify-center">
      <View>
        <Text className="text-2xl text-bold">Enable Location</Text>
      </View>

      <TouchableOpacity
        className="h-10 bg-green-500 rounded-3xl py-2 mt-4 w-[90%]"
        onPress={() => {
          askLocationPermission();
        }}
      >
        <Text className="text-center text-white text-[14px] font-medium">
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LocationPermissions;
