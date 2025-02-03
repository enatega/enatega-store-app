import { MotiView, Text } from "moti";

export default function WalletHeadingSkeleton() {
  return (
    <MotiView className="p-3 bg-white">
      <Text className="font-bold text-lg bg-white pb-5 mt-0">
        Recent Transactions
      </Text>
    </MotiView>
  );
}
