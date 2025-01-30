import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useContext, useRef } from "react";
import { IconSymbol } from "@/lib/ui/useable-components/IconSymbol";
import { ConfigurationContext } from "@/lib/context/global/configuration.context";
import AccordionItem from "@/lib/ui/useable-components/accordian";
import useOrderDetail from "@/lib/hooks/useOrderDetails";
import MapViewDirections from "react-native-maps-directions";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { linkToMapsApp } from "@/lib/utils/methods";
import { MapStyles } from "@/lib/utils/constants";

import ItemDetails from "@/lib/ui/screen-components/home/orders/main/item-details";
import SpinnerComponent from "@/lib/ui/useable-components/spinner";
import useDetails from "@/lib/hooks/useDetail";

// Icons
import RestIcon from "@/lib/assets/rest_icon.png";
import HomeIcon from "@/lib/assets/home_icon.png";
import RiderIcon from "@/lib/assets/rider_icon.png";

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

  return (
    <GestureHandlerRootView className="flex-1">
      <View
        className=" justify-center items-center"
        style={{ height: height * 0.5 }}
      >
        {locationPin && (
          <MapView
            // style={styles.map}
            className="h-full w-full"
            showsUserLocation
            zoomEnabled={true}
            zoomControlEnabled={true}
            rotateEnabled={false}
            initialRegion={{
              latitude: locationPin.location.latitude,
              longitude: locationPin.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            customMapStyle={MapStyles}
            provider={PROVIDER_GOOGLE}
          >
            {deliveryAddressPin && (
              <Marker
                coordinate={deliveryAddressPin.location}
                title="Delivery Address"
                onPress={() => {
                  linkToMapsApp(
                    deliveryAddressPin.location,
                    deliveryAddressPin.label
                  );
                }}
              >
                <Image source={HomeIcon} style={{ height: 35, width: 32 }} />
              </Marker>
            )}
            {restaurantAddressPin && (
              <Marker
                coordinate={restaurantAddressPin.location}
                title="Restaurant"
                onPress={() => {
                  linkToMapsApp(
                    restaurantAddressPin.location,
                    restaurantAddressPin.label
                  );
                }}
              >
                <Image source={RestIcon} style={{ height: 35, width: 32 }} />
              </Marker>
            )}
            {locationPin && (
              <Marker
                coordinate={locationPin.location}
                title="Rider"
                onPress={() => {
                  linkToMapsApp(locationPin.location, locationPin.label);
                }}
              >
                <Image source={RiderIcon} style={{ height: 35, width: 32 }} />
              </Marker>
            )}
            {order?.orderStatus === "ACCEPTED" ?
              <MapViewDirections
                origin={locationPin.location}
                destination={restaurantAddressPin.location}
                apikey={GOOGLE_MAPS_KEY}
                strokeWidth={4}
                strokeColor="black"
                onReady={(result) => {
                  setDistance(result?.distance);
                  setDuration(result?.duration);
                }}
              />
            : order?.orderStatus === "PICKED" ?
              <MapViewDirections
                origin={locationPin.location}
                destination={deliveryAddressPin.location}
                apikey={GOOGLE_MAPS_KEY}
                strokeWidth={4}
                strokeColor="black"
                onReady={(result) => {
                  setDistance(result.distance);
                  setDuration(result.duration);
                }}
              />
            : <MapViewDirections
                origin={restaurantAddressPin.location}
                destination={deliveryAddressPin.location}
                apikey={GOOGLE_MAPS_KEY}
                strokeWidth={4}
                strokeColor="black"
                onReady={(result) => {
                  setDistance(result?.distance);
                  setDuration(result?.duration);
                }}
              />
            }
          </MapView>
        )}
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={0} // Initially, the sheet starts at 50% height (snap point 0)
        snapPoints={["50%"]} // Snap points: 50%
        backgroundStyle={styles.backgroundStyle} // Optional, to style the background
        animateOnMount={true} // Ensure that the initial animation is applied
        handleIndicatorStyle={{ backgroundColor: "transparent" }}
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
                  })
                }
              >
                {loadingOrderStatus ?
                  <SpinnerComponent />
                : <Text className="text-center text-white text-lg font-medium">
                    Pick up
                  </Text>
                }
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
                {loadingOrderStatus ?
                  <SpinnerComponent />
                : <Text className="text-center text-white text-lg font-medium">
                    Mark as Delivered
                  </Text>
                }
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
                {loadingAssignOrder ?
                  <SpinnerComponent />
                : <Text className="text-center text-white text-lg font-medium">
                    Assign me
                  </Text>
                }
              </TouchableOpacity>
            )}
          </BottomSheetScrollView>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: "transparent", // Change to your desired background color
  },

  container: {
    backgroundColor: "white",
  },
  iconView: {
    position: "absolute",
  },
  icon: {
    position: "absolute",
    backgroundColor: "black",
    borderRadius: 5,
    marginLeft: 15,
    marginTop: 10,
    overflow: "hidden",
  },
  spinner: {
    display: "flex",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
  loading: {
    position: "absolute",
    zIndex: 999,
    elevation: 999,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
