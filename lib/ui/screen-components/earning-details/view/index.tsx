// Core
import { View } from "react-native";

// Interfaces
import {
  IEarningDetailsMainProps,
  IStoreEarningsResponse,
} from "@/lib/utils/interfaces/rider-earnings.interface";

// Hooks
import { useUserContext } from "@/lib/context/global/user.context";
import { QueryResult, useQuery } from "@apollo/client";
import { useState } from "react";
import { useTranslation } from "react-i18next";

// GraphQL
import { STORE_EARNINGS_GRAPH } from "@/lib/apollo/queries/earnings.query";

// Components
import EarningDetailsHeader from "../header";
import EarningsDetailStacks from "./earnings";

// Skeletons
import { EarningsSummaryMainLoading } from "@/lib/ui/skeletons";
import EarningDetailsDateFilter from "../date-filter";

// React Native Flash Message
import { showMessage } from "react-native-flash-message";

export default function EarningDetailsMain({
  dateFilter,
  setDateFilter,
}: IEarningDetailsMainProps) {
  // Hooks
  const { t } = useTranslation();

  // States
  const [isFiltering, setIsFiltering] = useState(false);
  const [isDateFilterVisible, setIsDateFilterVisible] = useState(false);
  const [pagination] = useState({
    page: 1,
    limit: 10,
  });

  // Contexts
  const { setModalVisible, userId } = useUserContext();

  // Queries
  const { loading: isStoreEarningsLoading, refetch: fetchStoreEarnings } =
    useQuery(STORE_EARNINGS_GRAPH, {
      onError: (err) => {
        console.error(err);
        showMessage({
          message:
            err.graphQLErrors[0].message ||
            err.networkError?.message ||
            "Failed to fetch earnings",
          type: "danger",
          duration: 1000,
        });
      },
      variables: {
        storeId: userId ?? "",
        page: pagination.page,
        limit: pagination.limit,
      },
    }) as QueryResult<
      IStoreEarningsResponse | undefined,
      {
        storeId: string;
        startDate?: string;
        endDate?: string;
        page: number;
        limit: number;
      }
    >;

  // Handlers
  async function handleDateFilterSubmit() {
    setIsFiltering(true);
    // Validation
    if (!dateFilter.startDate) {
      setIsFiltering(false);
      return showMessage({
        message: t("Please select a start date"),
        type: "danger",
        duration: 1000,
      });
    } else if (!dateFilter.endDate) {
      setIsFiltering(false);
      return showMessage({
        message: t("Please select an end date"),
        type: "danger",
        duration: 1000,
      });
    } else if (new Date(dateFilter.startDate) > new Date(dateFilter.endDate)) {
      setIsFiltering(false);
      return showMessage({
        message: t("Start date cannot be after end date"),
        type: "danger",
        duration: 1000,
      });
    }
    if (!userId) {
      setIsFiltering(false);
      return showMessage({
        message: t("Please log in to view your earnings"),
        type: "danger",
        duration: 1000,
      });
    }

    // Fetch with filters
    await fetchStoreEarnings({
      storeId: userId,
      startDate: dateFilter.startDate,
      endDate: dateFilter.endDate,
      page: pagination.page,
      limit: pagination.limit,
    });

    setIsFiltering(false);
    setIsDateFilterVisible(false);
  }
  // If loading
  if (isStoreEarningsLoading || isFiltering)
    return <EarningsSummaryMainLoading />;
  return (
    <View>
      <EarningDetailsDateFilter
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        handleFilterSubmit={handleDateFilterSubmit}
        isFiltering={isStoreEarningsLoading || isFiltering}
        isDateFilterVisible={isDateFilterVisible}
        setIsDateFilterVisible={setIsDateFilterVisible}
        refetchDeafult={fetchStoreEarnings}
      />
      <EarningDetailsHeader />
      <EarningsDetailStacks setModalVisible={setModalVisible} userId={userId} />
    </View>
  );
}
