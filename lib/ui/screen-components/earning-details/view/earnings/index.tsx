// Core
import { FlatList, View } from "react-native";

// Interfaces
import { IStoreEarningsDetailProps } from "@/lib/utils/interfaces/earning.interface";
import {
  IStoreEarnings,
  IStoreEarningsResponse,
} from "@/lib/utils/interfaces/rider-earnings.interface";

// Components
import NoRecordFound from "@/lib/ui/useable-components/no-record-found";
import EarningStack from "../../../earnings/view/earnings-stack";

// Apollo
import { STORE_EARNINGS_GRAPH } from "@/lib/apollo/queries";

// React Native Flash Message
import { showMessage } from "react-native-flash-message";

// Hooks
import { useApptheme } from "@/lib/context/theme.context";
import EarningStackSkeleton from "@/lib/ui/skeletons/earnings/earning-stack";
import { LazyQueryResultTuple, useLazyQuery } from "@apollo/client";
import { Fragment, useEffect, useState } from "react";

export default function EarningsDetailStacks({
  setModalVisible,
  userId,
}: IStoreEarningsDetailProps) {
  // States
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [storeEarningsDataState, setStoreEarningsDataState] = useState<
    IStoreEarnings[]
  >([] as IStoreEarnings[]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });

  // Hooks
  const { appTheme } = useApptheme();

  // Queries
  const [
    fetchStoreEarnings,
    { loading: isStoreEarningsLoading, data: storeEarningsData },
  ] = useLazyQuery(STORE_EARNINGS_GRAPH, {
    onCompleted: (data) => {
      if (data?.storeEarningsGraph.earnings.length) {
        setStoreEarningsDataState((prev) => {
          const newEarnings = data.storeEarningsGraph.earnings;
          const existingIds = new Set(prev.map((item) => item._id));
          const uniqueNewEarnings = newEarnings.filter(
            (item) => !existingIds.has(item._id),
          );
          return [...prev, ...uniqueNewEarnings];
        });
        setIsLoadingMore(false);
      }
    },
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
  }) as LazyQueryResultTuple<
    IStoreEarningsResponse | undefined,
    {
      storeId: string;
      startDate?: string;
      endDate?: string;
      page: number;
      limit: number;
    }
  >;

  const renderItem = ({
    item: earning,
    index,
  }: {
    item: IStoreEarnings;
    index: number;
  }) => (
    <EarningStack
      totalDeliveries={earning.earningsArray.length}
      date={earning._id}
      earning={earning.totalEarningsSum}
      _id={earning._id}
      earningsArray={earning.earningsArray}
      totalOrderAmount={earning.totalOrderAmount}
      setModalVisible={setModalVisible}
      isLast={
        storeEarningsDataState
          ? storeEarningsDataState?.length - 1 === index
          : false
      }
    />
  );

  // Empty Component
  const ListEmptyComponent = () => {
    if (isStoreEarningsLoading) return null;
    return <NoRecordFound />;
  };

  // Handlers
  const handleScrollEndDrag = () => {
    if (storeEarningsData?.storeEarningsGraph?.earnings?.length === 0) return;
    if (isStoreEarningsLoading) return;
    setPagination((prev) => ({
      ...prev,
      page: prev.page + 1,
    }));
  };

  // UseEffects
  useEffect(() => {
    setStoreEarningsDataState([]);
    setPagination({ page: 1, limit: 10 });
  }, [userId]);

  useEffect(() => {
    if (pagination.page > 0 && !isStoreEarningsLoading) {
      setIsLoadingMore(true);
      fetchStoreEarnings({
        variables: {
          storeId: userId ?? "",
          page: pagination.page,
          limit: pagination.limit,
        },
      });
    }
  }, [pagination.page]);
  return (
    <View
      className="h-full border-t-2"
      style={{
        borderTopColor: appTheme.borderLineColor,
        backgroundColor: appTheme.themeBackground,
      }}
    >
      <FlatList
        data={storeEarningsDataState ?? []}
        renderItem={({ item, index }) => renderItem({ item, index })}
        scrollEnabled={true}
        onScrollEndDrag={handleScrollEndDrag}
        onMomentumScrollEnd={handleScrollEndDrag}
        ListFooterComponent={() => {
          if (isLoadingMore && storeEarningsDataState?.length > 0) {
            return (
              <View>
                {[...Array(3)].map((_, index) => (
                  <EarningStackSkeleton key={index + "skeleton"} />
                ))}
              </View>
            );
          } else {
            return <Fragment></Fragment>;
          }
        }}
        showsVerticalScrollIndicator={false}
        className="scroll-smooth"
        keyExtractor={(item) => item._id}
        ListEmptyComponent={ListEmptyComponent}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 100,
        }}
      />
    </View>
  );
}
