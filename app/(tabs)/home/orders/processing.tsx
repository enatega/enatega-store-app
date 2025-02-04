import HomeProcessingOrdersMain from "@/lib/ui/screen-components/home/orders/main/processing-orders";

export default function HomeScreen() {
  return (
    <HomeProcessingOrdersMain
      route={{ key: "processing", title: "Processing Orders" }}
    />
  );
}
