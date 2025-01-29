import { ConfigurationContext } from "@/lib/context/global/configuration.context";
import { useContext } from "react";
import { View, Text } from "react-native";

const ItemDetails = ({ orderData: order }) => {
  // Context
  const configuration = useContext(ConfigurationContext);

  if (!order) return null;

  return (
    <View className="pb-4">
      <View className="flex-1 flex-row justify-between items-center">
        <Text className="font-[Inter] text-[11px] text-base font-[500] text-gray-600">
          ITEMS AND QUANTITY
        </Text>
        <Text className="font-[Inter] text-[11px] text-base font-[500] text-gray-600">
          PRICE
        </Text>
      </View>

      <View className="flex-1 mt-2">
        {order?.items?.map((item) => {
          return (
            <View
              key={item._id}
              className="flex-1 flex-row  justify-between items-start gap-x-2"
            >
              <View className="h-[3.8rem] w-12 bg-gray-400 justify-center items-center">
                <Text>I</Text>
              </View>
              <View className="flex-1">
                <View>
                  <Text className="font-[Inter] text-[14px] font-semibold text-left text-gray-900">
                    {item?.title ?? "-"}
                  </Text>
                </View>
                <View>
                  <Text className="font-[Inter] text-[12px] font-semibold text-left text-gray-600">
                    {item?.description ?? "-"}
                  </Text>
                </View>
                <View>
                  <Text className="font-[Inter] text-[12px] font-semibold text-left text-gray-900">
                    x{item?.quantity ?? "0"}
                  </Text>
                </View>
              </View>

              <View>
                <Text className="font-[Inter] text-[14px] font-semibold text-left text-gray-900">
                  {configuration?.currencySymbol}
                  {item.variation?.price}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default ItemDetails;
