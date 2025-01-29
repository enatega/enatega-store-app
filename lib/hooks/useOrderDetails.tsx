import React, { useLayoutEffect, useState, useContext, useEffect } from "react";

import { Ionicons } from "@expo/vector-icons";

import { useNavigation, useRoute } from "@react-navigation/native";

import { useLocationContext } from "../context/global/location.context";
import getEnvVars from "@/environment";
import { useRouter } from "expo-router";
import UserContext from "../context/global/user.context";

const useOrderDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const router = useRouter();
  const [tab] = useState(route.params?.tab);
  const [orderID] = useState(route.params?.itemId);
  const { assignedOrders, loadingAssigned } = useContext(UserContext);
  const [order, setOrder] = useState(route.params?.order);
  const { GOOGLE_MAPS_KEY } = getEnvVars();
  const { location } = useLocationContext();

  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: null,
      headerTitle: null,
      headerLeft: () => (
        <Ionicons
          onPress={() => router.replace("/(tabs)/home/orders")}
          name="chevron-back"
          size={24}
          color="black"
        />
      ),
    });
  }, [navigation]);
  useEffect(() => {
    if (!loadingAssigned) {
      setOrder(assignedOrders.find((o) => o._id === orderID));
    }
  }, [loadingAssigned, assignedOrders]);
  const deliveryAddressPin = {
    label: "Delivery Address",
    location: {
      latitude: +order?.deliveryAddress?.location?.coordinates[1] || 0,
      longitude: +order?.deliveryAddress?.location?.coordinates[0] || 0,
    },
  };
  const restaurantAddressPin = {
    label: "Restaurant Address",
    location: {
      latitude: +order?.restaurant?.location?.coordinates[1] || 0,
      longitude: +order?.restaurant?.location?.coordinates[0] || 0,
    },
  };
  const locationPin = {
    label: "Current Location",
    location: {
      latitude: +location?.latitude || 0,
      longitude: +location?.longitude || 0,
    },
  };
  return {
    locationPin,
    restaurantAddressPin,
    deliveryAddressPin,
    GOOGLE_MAPS_KEY,
    distance,
    setDistance,
    duration,
    setDuration,
    loadingAssigned,
    route,
    navigation,
    orderID,
    order,
    tab,
  };
};

export default useOrderDetail;
