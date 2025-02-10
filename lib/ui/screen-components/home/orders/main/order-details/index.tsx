/* eslint-disable @typescript-eslint/no-require-imports */
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useContext, useEffect, useRef, useState } from "react";
import MapViewDirections from "react-native-maps-directions";
import MapView, { LatLng, Marker } from "react-native-maps";

// Methods
import { linkToMapsApp } from "@/lib/utils/methods";

// Constants
// import { MapStyles } from "@/lib/utils/constants";

// Screen Components
import ItemDetails from "@/lib/ui/screen-components/home/orders/main/item-details";

// Hooks
import useOrderDetail from "@/lib/hooks/useOrderDetails";
import useDetails from "@/lib/hooks/useDetail";

// Context
import { ConfigurationContext } from "@/lib/context/global/configuration.context";

// UI Components
import { IconSymbol } from "@/lib/ui/useable-components/IconSymbol";
import AccordionItem from "@/lib/ui/useable-components/accordian";
import WelldoneComponent from "@/lib/ui/useable-components/well-done";
import SpinnerComponent from "@/lib/ui/useable-components/spinner";
import { Easing } from "react-native-reanimated";

const { height } = Dimensions.get("window");

export default function OrderDetailScreen() {
  // Ref
  const bottomSheetRef = useRef<BottomSheet>(null);
  // Context
  const configuration = useContext(ConfigurationContext);

  // Hook
  const {
    restaurantAddressPin,
    deliveryAddressPin,
    GOOGLE_MAPS_KEY,
    setDistance,
    setDuration,
    order,
    tab,
    locationPin,
  } = useOrderDetail();

  const {
    mutateAssignOrder,
    mutateOrderStatus,
    loadingAssignOrder,
    loadingOrderStatus,
  } = useDetails(order);

  // State
  const [orderId, setOrderId] = useState("");
  const [lineDashPhase, setLineDashPhase] = useState(0);
  // Ref
  const latitude = useRef(
    new Animated.Value(locationPin.location.latitude),
  ).current;
  const longitude = useRef(
    new Animated.Value(locationPin.location.longitude),
  ).current;
  const waveAnimation = useRef(new Animated.Value(0)).current; // Wave animation value

  // Handler
  const moveMarker = (newLocation: LatLng) => {
    Animated.timing(latitude, {
      toValue: newLocation.latitude,
      duration: 2000,
      useNativeDriver: false,
    }).start();

    Animated.timing(longitude, {
      toValue: newLocation.longitude,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  };

  // Use Effect
  useEffect(() => {
    const interval = setInterval(() => {
      const newLatitude = locationPin.location.latitude;
      const newLongitude = locationPin.location.longitude;
      moveMarker({ latitude: newLatitude, longitude: newLongitude });
    }, 5000);

    // Start wave animation
    const animation = Animated.loop(
      Animated.timing(waveAnimation, {
        toValue: 1000,
        duration: 10000,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    );

    animation.start();

    // Listen to the animated value change
    const id = waveAnimation.addListener(({ value }) => {
      setLineDashPhase(-Math.floor(value)); // Adjust this multiplier to control the dash speed
    });

    return () => {
      waveAnimation.removeListener(id); // Clean up listener
      animation.stop();
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <GestureHandlerRootView className="flex-1">
        <View
          style={{
            height: height * 0.5,
            backgroundColor: "transparent",
          }}
        >
          {locationPin ? (
            <MapView
              style={styles.map}
              showsUserLocation
              zoomEnabled={true}
              zoomControlEnabled={true}
              rotateEnabled={false}
              initialRegion={{
                latitude: locationPin?.location?.latitude ?? 0.0,
                longitude: locationPin?.location?.longitude ?? 0.0,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                // latitudeDelta: 0.05,
                // longitudeDelta: 0.05,
              }}

              // provider={Platform.OS === "android" ? PROVIDER_GOOGLE : undefined}
              // customMapStyle={MapStyles}
            >
              {deliveryAddressPin?.location && (
                <Marker
                  coordinate={deliveryAddressPin.location}
                  title="Delivery Address"
                  onPress={() => {
                    linkToMapsApp(
                      deliveryAddressPin.location,
                      deliveryAddressPin.label,
                    );
                  }}
                >
                  <Image
                    source={require("@/lib/assets/home_icon.png")}
                    style={{ height: 35, width: 32 }}
                  />
                </Marker>
              )}
              {restaurantAddressPin?.location && (
                <Marker
                  coordinate={restaurantAddressPin.location}
                  title="Restaurant"
                  onPress={() => {
                    linkToMapsApp(
                      restaurantAddressPin.location,
                      restaurantAddressPin.label,
                    );
                  }}
                >
                  <Image
                    source={require("@/lib/assets/rest_icon.png")}
                    style={{ height: 35, width: 32 }}
                  />
                </Marker>
              )}
              {/* {locationPin?.location && ( */}
              {
                <Marker.Animated
                  coordinate={{ latitude, longitude }}
                  title="Rider"
                  description="This is rider's location"
                  onPress={() => {
                    linkToMapsApp(locationPin.location, locationPin.label);
                  }}
                >
                  <Image
                    source={require("@/lib/assets/rider_icon.png")}
                    style={{ height: 35, width: 32 }}
                  />
                </Marker.Animated>
              }

              {order?.orderStatus === "ACCEPTED" ||
                (order?.orderStatus === "ASSIGNED" && (
                  <MapViewDirections
                    origin={locationPin.location}
                    destination={restaurantAddressPin.location}
                    apikey={GOOGLE_MAPS_KEY ?? ""}
                    strokeWidth={2}
                    strokeColor="black"
                    lineDashPattern={[5, 5]} // Dashed pattern
                    lineDashPhase={lineDashPhase} // Animated wave
                    onReady={(result) => {
                      setDistance(result?.distance);
                      setDuration(result?.duration);
                    }}
                  />
                ))}

              {order?.orderStatus === "PICKED" && (
                <MapViewDirections
                  origin={locationPin.location}
                  destination={deliveryAddressPin.location}
                  apikey={GOOGLE_MAPS_KEY ?? ""}
                  strokeWidth={2}
                  strokeColor="black"
                  lineDashPattern={[5, 5]} // Dashed pattern
                  lineDashPhase={lineDashPhase} // Animated wave
                  onReady={(result) => {
                    setDistance(result.distance);
                    setDuration(result.duration);
                  }}
                />
              )}

              {order?.orderStatus !== "ACCEPTED" &&
                order?.orderStatus !== "PICKED" &&
                order?.orderStatus !== "ASSIGNED" && (
                  <MapViewDirections
                    origin={restaurantAddressPin.location}
                    destination={deliveryAddressPin.location}
                    apikey={GOOGLE_MAPS_KEY ?? ""}
                    strokeWidth={2}
                    strokeColor="black"
                    lineDashPattern={[5, 5]} // Dashed pattern
                    lineDashPhase={lineDashPhase} // Animated wave
                    onReady={(result) => {
                      setDistance(result?.distance);
                      setDuration(result?.duration);
                    }}
                  />
                )}
            </MapView>
          ) : (
            <View className="flex-1 justify-center items-center gap-y-3">
              <Text className="text-3xl">Map not loaded.</Text>
              <Text className="text-lg text-gray-600">
                Please check for permissions.
              </Text>
            </View>
          )}
        </View>

        <BottomSheet
          ref={bottomSheetRef}
          index={0} // Initially, the sheet starts at 50% height (snap point 0)
          snapPoints={["50%"]} // Snap points: 50%
          backgroundStyle={styles.backgroundStyle} // Optional, to style the background
          animateOnMount={true} // Ensure that the initial animation is applied
          handleIndicatorStyle={{
            backgroundColor: "transparent",
          }}
          enableDynamicSizing
          enableOverDrag={false}
          maxDynamicContentSize={height * 0.8} // Set a maximum dynamic content size (optional)
        >
          <BottomSheetView className="flex-1  bg-white border border-gray-300 p-1.5 rounded-lg">
            <BottomSheetScrollView
              className="p-2"
              showsVerticalScrollIndicator={false}
            >
              {/* Order ID */}
              <View className="flex-row justify-between mb-4">
                <Text className="font-bold text-gray-600">Order ID</Text>
                <Text className="text-gray-900">#{order.orderId}</Text>
              </View>

              <View className="flex-1 flex-row justify-start items-center gap-x-4 mb-4">
                <View className="h-8 w-8 bg-gray-400 justify-center items-center">
                  <Text>I</Text>
                </View>
                <Text className="font-[Inter] text-lg font-bold leading-7 text-left underline-offset-auto decoration-skip-ink text-gray-900">
                  Store Name
                </Text>
              </View>

              {/* Pick Up Order */}
              <View className="flex-1 flex-row items-center gap-x-2 mb-4">
                <View>
                  <IconSymbol
                    name="apartment"
                    size={30}
                    weight="medium"
                    color="#111827"
                  />
                </View>
                <View>
                  <Text className="font-[Inter] text-base font-semibold leading-6 text-left underline-offset-auto decoration-skip-ink text-gray-500">
                    Pickup Order
                  </Text>
                  <Text className="font-[Inter] text-base font-bold leading-6 text-left underline-offset-auto decoration-skip-ink text-gray-900">
                    {order?.deliveryAddress?.deliveryAddress}
                  </Text>
                </View>
              </View>

              {/* Payment Method */}
              <View className="flex-1 flex-row justify-between items-center mb-4">
                <Text className="font-[Inter] text-[16px] text-base font-[500] text-gray-600">
                  Payment Method
                </Text>
                <Text className="font-[Inter] text-base font-semibold  text-left underline-offset-auto decoration-skip-ink text-gray-900  mr-2">
                  {order.paymentMethod}
                </Text>
              </View>

              {/* Order Amount */}
              <View className="flex-1 flex-row justify-between mb-4">
                <Text className="font-[Inter] text-[16px] text-base font-[500] text-gray-600">
                  Order Amount
                </Text>
                <View className="flex-row gap-x-1">
                  <Text className="font-[Inter] font-semibold text-left text-gray-900">
                    {configuration?.currencySymbol}
                    {order.orderAmount}
                  </Text>
                  <Text className="font-[Inter]   text-left   text-gray-500">
                    {order.paymentStatus === "PAID" ? "Paid" : "(Not paid yet)"}
                  </Text>
                </View>
              </View>

              {/* Divider */}
              <View className="flex-1 h-[1px] bg-gray-300 mb-4" />

              <AccordionItem title="Order Details">
                <ItemDetails orderData={order} tab={tab} />
              </AccordionItem>

              {/* Pick up Button */}
              {tab === "processing" && order.orderStatus === "ASSIGNED" && (
                <TouchableOpacity
                  className="h-14 bg-green-500 rounded-3xl py-3 w-full mt-4 mb-10"
                  onPress={() =>
                    mutateOrderStatus({
                      variables: { id: order?._id, status: "PICKED" },
                      onCompleted: () => {},
                    })
                  }
                >
                  {loadingOrderStatus ? (
                    <SpinnerComponent />
                  ) : (
                    <Text className="text-center text-white text-lg font-medium">
                      Pick up
                    </Text>
                  )}
                </TouchableOpacity>
              )}

              {tab === "processing" && order.orderStatus === "PICKED" && (
                <TouchableOpacity
                  className="h-14 bg-green-500 rounded-3xl py-3 w-full mt-4 mb-10"
                  onPress={() =>
                    mutateOrderStatus({
                      variables: { id: order?._id, status: "DELIVERED" },
                    })
                  }
                >
                  {loadingOrderStatus ? (
                    <SpinnerComponent />
                  ) : (
                    <Text className="text-center text-white text-lg font-medium">
                      Mark as Delivered
                    </Text>
                  )}
                </TouchableOpacity>
              )}

              {tab === "new_orders" && order.orderStatus === "ACCEPTED" && (
                <TouchableOpacity
                  className="h-14 bg-green-500 rounded-3xl py-3 w-full mt-4 mb-10"
                  onPress={() =>
                    mutateAssignOrder({
                      variables: { id: order?._id },
                    })
                  }
                >
                  {loadingAssignOrder ? (
                    <SpinnerComponent />
                  ) : (
                    <Text className="text-center text-white text-lg font-medium">
                      Assign me
                    </Text>
                  )}
                </TouchableOpacity>
              )}
            </BottomSheetScrollView>
          </BottomSheetView>
        </BottomSheet>
      </GestureHandlerRootView>
      <WelldoneComponent orderId={orderId} setOrderId={setOrderId} />
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    height: "100%",
    width: "100%",
  },
  backgroundStyle: {
    //zIndex: 0,
    backgroundColor: "transparent", // Change to your desired background color
  },
});
