import { IOrderComponentProps } from "@/lib/utils/interfaces/order.interface";
import { View, Text, TouchableOpacity } from "react-native";

const Order = ({ order, tab }: IOrderComponentProps) => {
  return (
    <View className="flex-1">
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          // router.push({
          //   pathname: "/order-detail",
          //   params: { itemId: order?._id, order: JSON.stringify(order), tab },
          // });
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
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Order;
