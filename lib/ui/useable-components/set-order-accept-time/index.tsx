/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, Pressable, TouchableOpacity } from "react-native";
import { useState } from "react";

// Hooks
import useAcceptOrder from "@/lib/hooks/useAcceptOrder";
import useOrderRing from "@/lib/hooks/useOrderRing";
// import usePrintOrder from "@/lib/hooks/usePrintOrder";

// Constants
import { TIMES } from "@/lib/utils/constants";

// Interface
import { ISetOrderTimeComponentProps } from "@/lib/utils/interfaces";

// UI
import SpinnerComponent from "../spinner";
import FlashMessageComponent from "../flash-message";

// Icons
import { CircleCrossIcon } from "../svg";

const SetTimeScreenAndAcceptOrder = ({
  id,
  orderId,
  handleDismissModal,
}: ISetOrderTimeComponentProps) => {
  // States
  const [selectedTime, setSelectedTime] = useState(TIMES[0]);

  const { muteRing, loading: loadingRing } = useOrderRing();
  const { acceptOrder, loading: loadingAcceptOrder } = useAcceptOrder();
  // const { printOrder } = usePrintOrder();

  const onAcceptOrderHandler = async () => {
    try {
      await acceptOrder(id, selectedTime?.toString() || "0");
      await muteRing(orderId);
      // printOrder(id);

      handleDismissModal();
    } catch (err) {
      FlashMessageComponent({ message: err?.message ?? "Order accept failed" });
    } finally {
      handleDismissModal();
    }
  };

  return (
    <View className="flex-1items-center justify-center px-4 pb-8">
      <View className="mt-4 mb-4 text-center flex-row justify-between items-center">
        <Text className="flex-1 text-center text-[16px] text-black font-[600]">
          Set Preparation Time
        </Text>
        <TouchableOpacity onPress={handleDismissModal}>
          <CircleCrossIcon width={24} height={24} />
        </TouchableOpacity>
      </View>

      <View className="mb-6">
        <View className="flex-row flex-wrap gap-2 justify-between">
          {TIMES.map((time, index) => (
            <Pressable
              key={index}
              onPress={() => setSelectedTime(time)}
              className={`h-fit justify-center items-center  p-4 rounded-[8px] ${
                selectedTime === time ? "bg-[#90E36D]" : "bg-gray-100"
              }`}
            >
              <Text
                className={`text-[Inter] text-center items-center text-[14px] font-medium ${
                  selectedTime === time ? "text-black" : "text-black"
                }`}
              >
                {`${time} mins`}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View>
        <TouchableOpacity
          className="h-12 bg-[#90E36D] rounded-3xl py-3"
          onPress={onAcceptOrderHandler}
        >
          {loadingAcceptOrder || loadingRing ? (
            <SpinnerComponent />
          ) : (
            <Text className="text-center text-white text-lg font-medium">
              Done
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SetTimeScreenAndAcceptOrder;
