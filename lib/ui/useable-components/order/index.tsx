import { View, TouchableOpacity, Text } from "react-native";

// Componetns
import Spinner from "../spinner";
import { IOrderComponentProps } from "@/lib/utils/interfaces/order.interface";
import useOrder from "@/lib/hooks/useOrder";

const Order = ({ order, orderAmount }: IOrderComponentProps) => {
  const { active, navigation, time, mutateAssignOrder, loadingAssignOrder } =
    useOrder(order);

  return (
    <>
      <View style={{ marginTop: 20 }}>
        {order?.orderStatus === "ACCEPTED" ||
        order?.orderStatus === "PICKED" ? (
          <View />
        ) : null}

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={
            () => alert("Go to Order Detail")
            // navigation.navigate('OrderDetail', {
            //     itemId: order?._id,
            //     order
            // })
          }
        >
          <View>
            <Text>Order ID</Text>
            <Text>{order?.orderId}</Text>
          </View>
          <View>
            <Text>Order Amount</Text>
            <Text>{orderAmount}</Text>
          </View>
          <View>
            <Text>Payment Method</Text>
            <Text>{order?.paymentMethod}</Text>
          </View>
          {active === "MyOrders" && (
            <View>
              <Text>Delivery Time</Text>
              <Text>
                {new Date(order?.createdAt).toLocaleDateString()}{" "}
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
            {active === "MyOrders" ? (
              <TouchableOpacity activeOpacity={0.8}>
                <Text>
                  {order?.orderStatus === "DELIVERED"
                    ? "Delivered"
                    : "In-Progress"}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  mutateAssignOrder({
                    variables: { id: order?._id },
                  });
                }}
              >
                <Text>{loadingAssignOrder ? <Spinner /> : "Assign Me"}</Text>
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Order;
