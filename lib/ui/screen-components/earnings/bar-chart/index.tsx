import { View } from "react-native";
import { BarChart, BarChartPropsType } from "react-native-gifted-charts";
export default function EarningsBarChart(props: BarChartPropsType) {
  return (
    <View className="mt-2">
      <BarChart
        barWidth={65}
        noOfSections={4}
        barBorderRadius={4}
        yAxisThickness={0}
        xAxisThickness={0}
        {...props}
      />
    </View>
  );
}
