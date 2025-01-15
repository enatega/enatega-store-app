import { Drawer } from "expo-router/drawer";

export default function Layout() {
  return (
    <Drawer>
      <Drawer.Screen
        name="(tabs)" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: "Home",
          title: "Home",
        }}
      />
      <Drawer.Screen
        name="profile" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: "Profile",
          title: "Profile",
        }}
      />
    </Drawer>
  );
}
