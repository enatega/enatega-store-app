// Interfaces
import { IStoreTransaction } from "@/lib/utils/interfaces/rider.interface";

// Icons
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

// Core
import { Text, View } from "react-native";

export default function RecentTransaction({
  transaction,
  isLast,
}: {
  transaction: IStoreTransaction;
  isLast: boolean;
}) {
  // Constants
  const date = new Date(transaction?.createdAt);

  // Hooks
  const { t } = useTranslation();

  return (
    <View
      className={`flex flex-row justify-between p-4 w-full ${isLast && "mb-24"}`}
    >
      <View className="flex flex-row gap-3 items-center">
        <Ionicons
          size={20}
          name={
            transaction?.status === "TRANSFERRED"
              ? "cash-outline"
              : transaction?.status === "PAID"
                ? "cash-sharp"
                : transaction?.status === "CANCELLED"
                  ? "remove-circle-outline"
                  : "arrow-down-circle"
          }
          color={
            transaction?.status === "TRANSFERRED"
              ? "#90E36D"
              : transaction?.status === "PAID"
                ? "orange"
                : transaction?.status === "CANCELLED"
                  ? "red"
                  : transaction?.status === "REQUESTED"
                    ? "#0EA5E9"
                    : "arrow-down-circle"
          }
        />
        <View className="flex flex-col justify-between gap-1">
          <Text className="font-semibold">
            {t(String(transaction?.status))}
          </Text>
          <Text>{String(date.toDateString())}</Text>
        </View>
      </View>
      <Text
        className="font-bold text-md"
        style={{
          color: transaction?.status === "REQUESTED" ? "#0EA5E9" : "black",
        }}
      >
        ${transaction?.amountTransferred}
      </Text>
    </View>
  );
}
