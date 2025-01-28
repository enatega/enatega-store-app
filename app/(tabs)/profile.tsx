import { Link } from "expo-router";
import { View } from "react-native";

export default function TabTwoScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      <Link
        href={{
          pathname: "/list/[id]",
          params: { id: 1 },
        }}
      >
        Coming Soon
      </Link>
      <Link
        href={{
          pathname: "/list/[id]",
          params: { id: 2 },
        }}
      >
        News 2
      </Link>
      <Link
        href={{
          pathname: "/list/[id]",
          params: { id: 3 },
        }}
      >
        News 3
      </Link>
    </View>
  );
}
