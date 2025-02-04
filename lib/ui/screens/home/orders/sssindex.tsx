/* eslint-disable @typescript-eslint/no-explicit-any */

// Constants
import { Colors } from "@/lib/utils/constants";
import React, { useState } from "react";
import {
  Animated,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
} from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";

// Components

import HomeNewOrdersMain from "@/lib/ui/screen-components/home/orders/main/new-orders";
import HomeProcessingOrdersMain from "@/lib/ui/screen-components/home/orders/main/processing-orders";
import HomeDeliveredOrdersMain from "@/lib/ui/screen-components/home/orders/main/delivered-orders";
import PagerView from "react-native-pager-view";

const HomeOrdersScreen: React.FC = () => {
  const [index, setIndex] = useState(0); // State for the active tab index

  return (
    <PagerView
      style={styles.pagerView}
      initialPage={0}
      orientation="horizontal"
    >
      <View style={styles.page} key="1">
        <HomeNewOrdersMain route={{ key: "1", title: "New" }} />
      </View>
      <View style={styles.page} key="2">
        <HomeProcessingOrdersMain route={{ key: "2", title: "Processing" }} />
      </View>
    </PagerView>
  );
};

export default HomeOrdersScreen;

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },
  page: {
    flex: 1,
    backgroundColor: "white",
  },
});
