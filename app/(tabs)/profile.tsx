import { Link } from "expo-router";
import { View, Text} from "react-native";

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
        <Text>Coming Soon</Text>
      </Link>
      <Link
        href={{
          pathname: "/list/[id]",
          params: { id: 2 },
        }}
      >
        <Text>News 2</Text>
      </Link>
      <Link
        href={{
          pathname: "/list/[id]",
          params: { id: 3 },
        }}
      >
        <Text>News 3</Text>
      </Link>
    </View>
  );
}
