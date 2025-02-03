import { MotiView, Text } from "moti";

export default function EarningHeadingSkeleton() {
  return (
    <MotiView className="p-3 bg-white flex flex-row w-full justify-between px-5">
      <Text className="font-bold text-lg bg-white pb-5 mt-0">
        Recent Activity
      </Text>
      <Text className="text-sm text-[#3B82F6] font-bold">See More</Text>
    </MotiView>
  );
}
