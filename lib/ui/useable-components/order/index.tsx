import { View, TouchableOpacity, Text } from "react-native";

// Componetns
import { IconSymbol } from "@/lib/ui/useable-components/IconSymbol";
import SpinnerComponent from "@/lib/ui/useable-components/spinner";
// Interface
import { IOrderComponentProps } from "@/lib/utils/interfaces/order.interface";
// Hook
import useOrder from "@/lib/hooks/useOrder";
import { ConfigurationContext } from "@/lib/context/global/configuration.context";
import { useContext } from "react";
import { useRouter } from "expo-router";

const Order = ({ order, tab }: IOrderComponentProps) => {
  // Hook
  const { time, mutateAssignOrder, loadingAssignOrder } = useOrder(order);

  // // Context
  const configuration = useContext(ConfigurationContext);

  // Hooks
  const router = useRouter();

  return (
    <>
      <View className="flex-1">
        {order?.orderStatus === "ACCEPTED" || order?.orderStatus === "PICKED" ?
          <View />
        : null}

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            router.push({
              pathname: "/order-detail",
              params: { itemId: order?._id, order: JSON.stringify(order), tab },
            });
          }}
        >
          <View className="flex-1 gap-y-4 bg-gray-50 border border-gray-100 border-1 rounded-[8px] m-4 p-2">
            {/* Status */}
            <View className="flex-1 flex-row justify-between items-center">
              <Text className="font-[Inter] text-base font-bold  text-left decoration-skip-ink-0 text-gray-600">
                Status
              </Text>
              <View
                className={`ps-3 pe-3 bg-green-100 border border-1 rounded-[12px] ${
                  tab === "delivered" ? "border-blue-500 bg-blue-100"
                  : tab === "processing" ? "border-yellow-500 bg-yellow-100"
                  : "border-green-500 bg-green-100"
                }`}
              >
                <Text
                  className={`font-[Inter] text-[12px] font-semibold text-center decoration-skip-ink-0 ${
                    tab === "delivered" ? "text-blue-800"
                    : tab === "processing" ? "text-yellow-800"
                    : "text-green-800"
                  }`}
                >
                  {order?.orderStatus}
                </Text>
              </View>
            </View>

            {/* Order ID */}
            <View className="flex-1 flex-row justify-between items-center">
              <Text className="font-[Inter] text-base font-bold  text-left decoration-skip-ink-0 text-gray-600">
                Order ID
              </Text>
              <Text className="font-[Inter] text-[16px] text-base font-semibold  text-right underline-offset-auto decoration-skip-ink text-gray-900  mr-2">
                #{order?.orderId}
              </Text>
            </View>

            {/* Store Image and Name */}
            <View className="flex-1 flex-row justify-start items-center gap-x-4">
              <View className="h-8 w-8 bg-gray-400 justify-center items-center">
                <Text>I</Text>
              </View>
              <Text className="font-[Inter] text-lg font-bold leading-7 text-left underline-offset-auto decoration-skip-ink text-gray-900">
                Store Name
              </Text>
            </View>

            {/* Pick Up Order */}
            <View className="flex-1 flex-row items-center gap-x-2">
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
                  {order?.deliveryAddress.deliveryAddress}
                </Text>
              </View>
            </View>

            {/* Delivery Order */}
            <View className="flex-1 flex-row items-center gap-x-2">
              <View>
                <IconSymbol
                  name="home"
                  size={30}
                  weight="medium"
                  color="#111827"
                />
              </View>
              <View>
                <Text className="font-[Inter] text-base font-semibold leading-6 text-left underline-offset-auto decoration-skip-ink text-gray-500">
                  Delivery Order
                </Text>
                <Text className="font-[Inter] text-base font-bold leading-6 text-left underline-offset-auto decoration-skip-ink text-gray-900">
                  79 Kampuchea Krom Boulevard (128)
                </Text>
              </View>
            </View>

            {/* Price/Time/Distance */}
            <View className="flex-1 flex-row justify-between items-center">
              <View className=" flex-row gap-x-1">
                <IconSymbol
                  size={20}
                  name="currency-exchange"
                  color="#6b7280"
                />
                <Text className="font-[Inter] text-base font-medium leading-6 text-left underline-offset-auto decoration-skip-ink text-gray-500">
                  0.71
                </Text>
              </View>

              <View className=" flex-row gap-x-1">
                <IconSymbol size={20} name="access-time" color="#6b7280" />
                <Text className="font-[Inter] text-base font-medium leading-6 text-left underline-offset-auto decoration-skip-ink text-gray-500">
                  {time}
                </Text>
              </View>

              <View className="flex-row gap-x-1">
                <IconSymbol size={20} name="directions-bike" color="#6b7280" />
                <Text className="font-[Inter] text-base font-medium leading-6 text-left underline-offset-auto decoration-skip-ink text-gray-500">
                  1.7 km
                </Text>
              </View>
            </View>

            {/* Payment Method */}
            <View className="flex-1 flex-row justify-between items-center">
              <Text className="font-[Inter] text-[16px] text-base font-[500] text-gray-600">
                Payment Method
              </Text>
              <Text className="font-[Inter] text-base font-semibold  text-left underline-offset-auto decoration-skip-ink text-gray-900  mr-2">
                {order?.paymentMethod}
              </Text>
            </View>

            {/* Order Amount */}
            <View className="flex-1 flex-row justify-between">
              <Text className="font-[Inter] text-[16px] text-base font-[500] text-gray-600">
                Order Amount
              </Text>
              <View className="flex-row gap-x-1">
                <Text className="font-[Inter] font-semibold text-left text-gray-900">
                  {configuration?.currencySymbol}
                  {order?.orderAmount}
                </Text>
                <Text className="font-[Inter]   text-left   text-gray-500">
                  {order.paymentStatus === "PAID" ? "Paid" : "(Not paid yet)"}
                </Text>
              </View>
            </View>

            {/* Order Comment */}
            <View className="flex-1">
              <Text className="font-[Inter] text-[16px] text-base font-[500] text-gray-600">
                Order Comment
              </Text>
              <Text className="font-[Inter] text-[16px] italic font-medium text-gray-900">
                No Comment
              </Text>
            </View>

            {/* Login Button */}
            {tab === "new_orders" && (
              <TouchableOpacity
                className="h-12 bg-green-500 rounded-3xl py-3 mt-10 w-full"
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

            {/* <View>
              <Text>Payment Method</Text>
              <Text>{order?.paymentMethod}</Text>
            </View>
            {active === "MyOrders" && (
              <View>
                <Text>Delivery Time</Text>
                <Text>
                  {new Date(order?.createdAt).toLocaleDateString()}
                  {new Date(order?.createdAt).toLocaleTimeString()}
                </Text>
              </View>
            )}
            <View />
            <View>
              {active === "NewOrders" && (
                <View>
                  <Text>Time Left</Text>
                  <Text>{time}</Text>
                </View>
              )}
              {active === "MyOrders" ?
                <TouchableOpacity activeOpacity={0.8}>
                  <Text>
                    {order?.orderStatus === "DELIVERED" ?
                      "Delivered"
                    : "In-Progress"}
                  </Text>
                </TouchableOpacity>
              : <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    mutateAssignOrder({
                      variables: { id: order?._id },
                    });
                  }}
                >
                  {loadingAssignOrder ?
                    <Spinner />
                  : <Text>Assign Me</Text>}
                </TouchableOpacity>
              }
            </View> */}
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Order;
