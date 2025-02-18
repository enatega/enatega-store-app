import { useState } from "react";
import { View, Platform, StyleSheet } from "react-native";
// UI
import CustomTab from "@/lib/ui/useable-components/custom-tab";
// Constants
import { ORDER_DISPATCH_TYPE } from "@/lib/utils/constants";

// Interface
// import { IOrderTabsComponentProps } from "@/lib/utils/interfaces";

function HomeProcessingOrdersMain(/* props: IOrderTabsComponentProps */) {
  // States
  const [currentTab, setCurrentTab] = useState<string>(ORDER_DISPATCH_TYPE[0]);

  return (
    <View
      className="pt-14 flex-1 items-center  bg-white pb-16"
      style={style.contaienr}
    >
      <CustomTab
        options={ORDER_DISPATCH_TYPE}
        selectedTab={currentTab}
        setSelectedTab={setCurrentTab}
      />
    </View>
  );
}

export default HomeProcessingOrdersMain;

const style = StyleSheet.create({
  contaienr: {
    paddingBottom: Platform.OS === "android" ? 50 : 80,
  },
});
