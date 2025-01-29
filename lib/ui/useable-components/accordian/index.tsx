import { useState } from "react";
import type { PropsWithChildren } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

type AccordionItemPros = PropsWithChildren<{
  title: string;
}>;

export default function AccordionItem({
  children,
  title,
}: AccordionItemPros): JSX.Element {
  const [expanded, setExpanded] = useState(false);

  function toggleItem() {
    setExpanded(!expanded);
  }

  return (
    <View>
      <TouchableOpacity
        className="bg-transparent text-[#eee] flex-1 flex-row justify-between"
        onPress={toggleItem}
      >
        <Text className="font-[Inter] text-[14px] font-semibold text-left   text-gray-600">
          {title}
        </Text>
        <Icon
          name={expanded ? "expand-less" : "expand-more"}
          size={30}
          color="#bbb"
        />
      </TouchableOpacity>
      {expanded && children}
    </View>
  );
}
