import { IRiderTransaction } from "@/lib/utils/interfaces/rider.interface";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export default function RecentTransaction({
  transaction,
  isLast,
}: {
  transaction: IRiderTransaction;
  isLast: boolean;
}) {
  const date = new Date(transaction.createdAt);
  return (
    <View
      className={`flex flex-row justify-between p-4 w-full ${isLast && "mb-24"}`}
    >
      <View className="flex flex-row gap-3 items-center">
        <Ionicons
          size={20}
          name={
            transaction.status === "TRANSFERRED"
              ? "arrow-up"
              : transaction.status === "PAID"
                ? "cash-sharp"
                : transaction.status === "CANCELLED"
                  ? "remove-circle-outline"
                  : "arrow-down-circle"
          }
        />
        <View className="flex flex-col justify-between gap-1">
          <Text className="font-semibold">{transaction.status}</Text>
          <Text>{date.toDateString()}</Text>
        </View>
      </View>
      <Text className="font-bold text-md">
        ${transaction?.amountTransferred}
      </Text>
    </View>
  );
}
