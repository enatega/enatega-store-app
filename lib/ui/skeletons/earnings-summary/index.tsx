import { MotiScrollView, MotiView } from "moti";
import EarningSummaryHeader from "./earnings-summary-header";
import EarningStackSkeleton from "../earnings/earning-stack";

export default function EarningsSummaryMainLoading() {
  return (
    <MotiView>
      <EarningSummaryHeader />
      <MotiScrollView>
        {[...Array(10)].map((_, index) => {
          return <EarningStackSkeleton key={index} />;
        })}
      </MotiScrollView>
    </MotiView>
  );
}
