import { MotiView } from "moti";
import WalletTopInfoSkeleton from "./wallet-top-info";
import WalletRecentTransactionSkeleton from "./wallet-recent-transactions";
import WalletHeadingSkeleton from "./wallet-heading";

export default function WalletScreenMainLoading() {
  return (
    <MotiView className="flex flex-col bg-white justify-evenly h-full w-full">
      <WalletTopInfoSkeleton />
      <WalletHeadingSkeleton />
      <WalletRecentTransactionSkeleton />
    </MotiView>
  );
}
