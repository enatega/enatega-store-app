// Components
import EarningDetailsMain from "@/lib/ui/screen-components/earning-details/view";

// Interfaces
import { IDateFilter } from "@/lib/utils/interfaces/rider-earnings.interface";

// Hooks
import { useState } from "react";

// Safe Area
import { SafeAreaView } from "react-native";

export default function EarningsDetailScreen() {
  const [dateFilter, setDateFilter] = useState<IDateFilter>({
    startDate: "",
    endDate: "",
  });
  return (
    <SafeAreaView className="bg-white">
      <EarningDetailsMain
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
      />
    </SafeAreaView>
  );
}
