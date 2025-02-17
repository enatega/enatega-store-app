import HomeDeliveredOrdersMain from "@/lib/ui/screen-components/home/orders/main/delivered-orders";

export default function HomeScreen() {
  return (
    <HomeDeliveredOrdersMain
      route={{ key: "delivered", title: "Delivered Orders" }}
    />
  );
}
