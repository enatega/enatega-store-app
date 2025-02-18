import { View, Text, TouchableOpacity } from "react-native";

import { ICustomTabProps } from "@/lib/utils/interfaces";

const CustomTab = ({
  options,
  selectedTab,
  setSelectedTab,
}: ICustomTabProps) => {
  return (
    <View className="sticky top-0 z-10 w-full bg-white p-3">
      <View className="h-[50px] w-full flex-row p-2 justify-center items-center space-x-2 rounded-[8px] bg-[#F3F4F6]">
        {options.map((option) => (
          <TouchableOpacity
            key={String(option)}
            onPress={() => setSelectedTab(option)}
            className={`h-full px-4 py-2 w-1/2 flex items-center justify-center rounded-[8px] ${
              selectedTab === option ? "bg-[#90E36D]" : ""
            }`}
          >
            <Text
              className={`${selectedTab === option ? "text-black" : "text-gray-500"}`}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default CustomTab;
