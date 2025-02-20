import moment from "moment";
import { useContext, useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

// Context
import { ConfigurationContext } from "@/lib/context/global/configuration.context";

// Interface
import { IOrderComponentProps } from "@/lib/utils/interfaces/order.interface";

// Methods
import { getIsAcceptButtonVisible } from "@/lib/utils/methods/gloabl";
import { orderSubTotal } from "@/lib/utils/methods";
// Constants
import { MAX_TIME } from "@/lib/utils/constants";
// UI
import { TimeLeftIcon } from "../svg";
import SpinnerComponent from "../spinner";

// Hooks
import useCancelOrder from "@/lib/hooks/useCancelOrder";
import useOrderPickedUp from "@/lib/hooks/useOrderPickedUp";
import CountdownTimer from "../custom-timer";
import { useTranslation } from "react-i18next";

const Order = ({
  order,
  tab,
  handlePresentModalPress,
}: IOrderComponentProps) => {
  // Context
  const configuration = useContext(ConfigurationContext);

  // Hooks
  const { t } = useTranslation();
  const { cancelOrder, loading: loadingCancelOrder } = useCancelOrder();
  const { pickedUp, loading: loadingPicked } = useOrderPickedUp();

  // Ref
  const timer = useRef<NodeJS.Timeout>();

  // States
  const [isAcceptButtonVisible, setIsAcceptButtonVisible] = useState(
    getIsAcceptButtonVisible(order?.orderDate),
  );

  // Timer
  const timeNow = new Date();
  const date = new Date(order.orderDate);
  const acceptanceTime = moment(date).diff(timeNow, "seconds");
  const createdTime = new Date(order?.createdAt);
  let remainingTime = moment(createdTime)
    .add(MAX_TIME, "seconds")
    .diff(timeNow, "seconds");

  // Prepation Time
  // Preparation Time
  // Store current time in UTC
  const prep = new Date(order.preparationTime ?? "2023-08-16T08:00:00.000Z");
  const diffTime = prep - timeNow;
  const totalPrep = diffTime > 0 ? diffTime / 1000 : 0;

  const decision = !isAcceptButtonVisible
    ? acceptanceTime
    : remainingTime > 0
      ? remainingTime
      : 0;

  if (decision === acceptanceTime) {
    remainingTime = 0;
  }

  // Handlers
  const onCancelOrderHandler = () => {
    cancelOrder(order._id, "not available");
  };

  const onPickupOrder = () => {
    pickedUp(order._id);
  };

  // Use Effects
  useEffect(() => {
    let isSubscribed = true;
    (() => {
      timer.current = setInterval(() => {
        const isAcceptButtonVisible = !moment().isBefore(order?.orderDate);
        if (isSubscribed) {
          setIsAcceptButtonVisible(isAcceptButtonVisible);
        }
        if (isAcceptButtonVisible) {
          if (timer.current) clearInterval(timer.current);
        }
      }, 10000);
    })();
    return () => {
      if (timer.current) clearInterval(timer.current);
      isSubscribed = false;
    };
  }, []);

  return (
    <View className="w-full">
      {/* <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
             
            }}
          > */}
      <View className="flex-1 gap-y-2 bg-gray-50 border border-gray-100 border-1 rounded-[8px] m-4 p-4">
        {/* Status */}
        <View className="flex-1 flex-row justify-between items-center">
          <Text className="font-[Inter] text-base font-bold  text-left decoration-skip-ink-0 text-gray-600">
            {t("Status")}
          </Text>
          <View
            className={`ps-3 pe-3 bg-green-100 border border-1 rounded-[12px] ${
              tab === "delivered"
                ? "border-blue-500 bg-blue-100"
                : tab === "processing"
                  ? "border-yellow-500 bg-yellow-100"
                  : "border-green-500 bg-green-100"
            }`}
          >
            <Text
              className={`font-[Inter] text-[12px] font-semibold text-center decoration-skip-ink-0 ${
                tab === "delivered"
                  ? "text-blue-800"
                  : tab === "processing"
                    ? "text-yellow-800"
                    : "text-green-800"
              }`}
            >
              {t(order?.orderStatus ?? "")}
            </Text>
          </View>
        </View>

        {/* Order ID */}
        <View className="flex-1 flex-row justify-between items-center">
          <Text className="font-[Inter] text-base font-bold  text-left decoration-skip-ink-0 text-gray-600">
            {t("Order ID")}
          </Text>
          <Text className="font-[Inter] text-[16px] text-base font-semibold  text-right underline-offset-auto decoration-skip-ink text-gray-900  mr-2">
            #{order?.orderId}
          </Text>
        </View>

        {/* Order Items */}
        <View className="flex-1 flex-row justify-between items-center">
          <Text className="font-[Inter] text-sm font-bold  text-left decoration-skip-ink-0 text-gray-500">
            {t("ORDER")}
          </Text>

          <Text className="font-[Inter] text-sm font-bold  text-left decoration-skip-ink-0 text-gray-500">
            {t("PRICE")}
          </Text>
        </View>

        <View>
          {order?.items?.map((item) => {
            return (
              <View
                key={item._id}
                className="flex-1 flex-row justify-between items-center mb-6"
              >
                <View className="w-full flex-row justify-between">
                  {/* Left */}
                  <View className="flex-row gap-x-2 w-[90%]">
                    {/* Image */}
                    <View className="w-[60px] h-[70px] bg-gray-200 rounded-[8px]">
                      <Image
                        src={item.image}
                        style={{ width: 60, height: 70, borderRadius: 8 }}
                      />
                    </View>

                    {/* Item Detaisl */}
                    <View className="gap-y-2 justify-between">
                      <View>
                        <View>
                          <Text className="font-[Inter] font-semibold  text-gray-900 mb-[4px]">
                            {item?.variation?.title.slice(0, 37)}
                          </Text>
                        </View>

                        {item?.addons?.length > 0 && (
                          <View className="w-[90%]">
                            <Text className="font-[Inter] text-md  text-gray-600">
                              {t("Addons")} ({t("Options")})
                            </Text>

                            {item?.addons?.map((addon, id) => {
                              return (
                                <View>
                                  <View className="w-[90%]">
                                    <Text
                                      className="font-[Inter] text-sm  text-gray-500"
                                      key={id}
                                    >
                                      {id + 1} - {addon?.title}
                                    </Text>
                                  </View>
                                  <View className="ml-[15px]">
                                    {addon?.options?.map((option, ide) => {
                                      return (
                                        <View
                                          key={ide}
                                          className="flex-row gap-x-2 justify-between w-[95%]"
                                        >
                                          <Text className="font-[Inter] text-xs  text-gray-500">
                                            {id + 1}.{ide + 1} - {option.title}
                                          </Text>
                                          <Text className="font-[Inter] text-xs  text-gray-500">
                                            {configuration?.currencySymbol}
                                            {option?.price}
                                          </Text>
                                        </View>
                                      );
                                    })}
                                  </View>
                                </View>
                              );
                            })}
                          </View>
                        )}
                      </View>
                      {item?.specialInstructions && (
                        <View className="w-[90%]">
                          <Text className="font-[Inter] text-xs font-bold  text-gray-500 mb-[4px]">
                            {t("Special Instructions")}
                          </Text>
                          <Text className="font-[Inter] text-xs   text-gray-500 mb-[4px]">
                            {item?.specialInstructions}
                          </Text>
                        </View>
                      )}
                      <View>
                        {/* <Text className="font-[Inter] text-gray-600">
                          Quantity
                        </Text> */}
                        <Text className="font-[Inter] text-sm font-[600]  text-left decoration-skip-ink-0 text-gray-900">
                          x{item?.quantity}
                        </Text>
                      </View>
                    </View>
                  </View>
                  {/* Right */}
                  <View className="w-[10%] items-end">
                    <Text>
                      {configuration?.currencySymbol}
                      {item?.variation.price}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        {/* Divider */}
        <View className="flex-1 h-[1px] bg-gray-300 mb-4 mt-4" />

        {/* SuB TOTAL */}
        <View className="flex-row justify-between">
          <Text className="text-gray-900 font-semibold text-lg">
            {t("Sub Total")}
          </Text>
          <Text className="text-gray-900 font-semibold text-lg">
            {configuration?.currencySymbol}
            {orderSubTotal(order)}
          </Text>
        </View>

        {/* Tip */}
        <View className="flex-row justify-between">
          <Text className="text-gray-900 font-semibold text-lg">
            {t("Tip")}
          </Text>
          <Text className="text-gray-900 font-semibold text-lg">
            {configuration?.currencySymbol}
            {order?.tipping}
          </Text>
        </View>

        {/* Tax */}
        <View className="flex-row justify-between">
          <Text className="text-gray-900 font-semibold text-lg">Tax</Text>
          <Text className="text-gray-900 font-semibold text-lg">
            {configuration?.currencySymbol}
            {order?.taxationAmount}
          </Text>
        </View>

        {/* Delivery */}
        <View className="flex-row justify-between">
          <Text className="text-gray-900 font-semibold text-lg">
            {t("Delivery Charges")}
          </Text>
          <Text className="text-gray-900 font-semibold text-lg">
            {configuration?.currencySymbol}
            {order?.deliveryCharges}
          </Text>
        </View>

        {/* Total Amount */}
        <View className="flex-row justify-between">
          <Text className="text-gray-900 font-semibold text-lg">
            {t("Total")}
          </Text>
          <Text className="text-gray-900 font-semibold text-lg">
            {configuration?.currencySymbol}
            {order?.orderAmount}
          </Text>
        </View>

        {/* Other UI Based on Order Status */}

        {/* Order Instructions */}
        {order?.instructions && (
          <View className="bg-white rounded-[4px] p-2">
            <Text className="text-gray-600 font-semibold text-lg">
              {t("Comment")}
            </Text>
            <Text className="text-gray-600 font-semibold italic text-lg">
              {order?.instructions}
            </Text>
          </View>
        )}

        {/* New Order */}
        {order?.orderStatus === "PENDING" && (
          <View>
            <View className="flex-row gap-x-4 w-full mt-10">
              {/* Decline */}
              <TouchableOpacity
                className="flex-1 h-16 items-center justify-center bg-transparent border border-red-500 rounded-[30px]"
                onPress={() => onCancelOrderHandler()}
              >
                {loadingCancelOrder ? (
                  <SpinnerComponent color="#ef4444" />
                ) : (
                  <Text className="text-center text-red-500 text-lg font-medium">
                    {t("Decline")}
                  </Text>
                )}
              </TouchableOpacity>

              {/* Accept */}
              {handlePresentModalPress && (
                <TouchableOpacity
                  className="flex-1 h-16 items-center justify-center bg-[#90E36D]  border border-[#90E36D] rounded-[30px]"
                  onPress={() => handlePresentModalPress(order)}
                >
                  <Text className="text-center text-black text-lg font-medium">
                    {t("Accept")}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}

        {/* Processing */}
        {["ACCEPTED", "ASSIGNED", "PICKED"].includes(
          order?.orderStatus ?? "",
        ) && (
          <>
            <View className="w-full items-center">
              <View className="flex-row items-center justify-center gap-x-2">
                <TimeLeftIcon />

                <View>
                  <Text className="font-[Inter] font-[500] text-[#191919] text-[14px]">
                    {t("Time Left")}
                  </Text>

                  <CountdownTimer duration={totalPrep} />
                </View>
              </View>
            </View>

            {order.orderStatus === "ASSIGNED" && (
              <View className="flex-row gap-x-4 w-full mt-10">
                {/* Hand Order to Rider */}
                <TouchableOpacity
                  className="flex-1 h-16 items-center justify-center bg-[#90E36D]  border border-[#90E36D] rounded-[30px]"
                  onPress={() => onPickupOrder()}
                >
                  {loadingPicked ? (
                    <SpinnerComponent color="#fff" />
                  ) : (
                    <Text className="text-center text-black text-lg font-medium">
                      {t("Hand Order to Rider")}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            )}
          </>
        )}

        {/* Delivered */}
      </View>
      {/* </TouchableOpacity> */}
    </View>
  );
};

export default Order;
