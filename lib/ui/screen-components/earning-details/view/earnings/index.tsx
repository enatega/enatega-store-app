// Core
import { FlatList, View } from "react-native";

// Interfaces
import { IStoreEarningsDetailProps } from "@/lib/utils/interfaces/earning.interface";
import { IStoreEarnings } from "@/lib/utils/interfaces/rider-earnings.interface";

// Components
import { useApptheme } from "@/lib/context/theme.context";
import NoRecordFound from "@/lib/ui/useable-components/no-record-found";
import EarningStack from "../../../earnings/view/earnings-stack";

export default function EarningsDetailStacks({
  storeEarningsData,
  isStoreEarningsLoading,
  setModalVisible,
}: IStoreEarningsDetailProps) {
  const { appTheme } = useApptheme();

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
        storeEarningsData?.storeEarningsGraph?.earnings
          ? storeEarningsData?.storeEarningsGraph?.earnings?.length - 1 ===
            index
          : false
      }
    />
  );

  const ListEmptyComponent = () => {
    if (isStoreEarningsLoading) return null;
    return <NoRecordFound />;
  };

  return (
    <View
      className="h-full border-t-2"
      style={{
        borderTopColor: appTheme.borderLineColor,
        backgroundColor: appTheme.themeBackground,
      }}
    >
      <FlatList
        data={storeEarningsData?.storeEarningsGraph?.earnings ?? []}
        renderItem={({ item, index }) => renderItem({ item, index })}
        scrollEnabled={
          (storeEarningsData?.storeEarningsGraph?.earnings?.length ?? 0) > 0
        }
        showsVerticalScrollIndicator={false}
        className="scroll-smooth"
        keyExtractor={(item) => item._id}
        ListEmptyComponent={ListEmptyComponent}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 200,
        }}
      />
    </View>
  );
}
