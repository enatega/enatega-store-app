// Core
import { View } from "react-native";

// Chart
import { BarChart, BarChartPropsType } from "react-native-gifted-charts";
export default function EarningsBarChart(props: BarChartPropsType) {
  return (
    <View className="mt-2">
      <BarChart
        barWidth={30}
        height={60}
        noOfSections={4}
        barBorderRadius={4}
        yAxisThickness={0}
        xAxisThickness={0}
        {...props}
      />
    </View>
  );
}
