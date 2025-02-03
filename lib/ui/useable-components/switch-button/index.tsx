import React from "react";
import { View, Switch, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/lib/utils/constants";

interface CustomSwitchProps {
  value: boolean;
  onToggle: (val: boolean) => void;
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({ value, onToggle }) => {
  return (
    <TouchableOpacity
      className="flex-row items-center"
      onPress={() => onToggle(!value)}
      activeOpacity={0.8}
    >
      <View
        className="w-16 h-8 rounded-full flex-row items-center px-1"
        style={{ backgroundColor: value ? Colors.light.switchButtonColor : Colors.light.secondaryTextColor}}
      >
        {value ? (
          <View className="ml-auto mr-[1px] bg-white rounded-full h-[20px] w-[20px]">
            <MaterialIcons
              name="check"
              size={20}
              color={Colors.light.switchButtonColor}
            />
          </View>
        ) : (
          <View className="ml-[1px] bg-white rounded-full h-[20px] w-[20px]">
            <MaterialIcons
              name="close"
              size={20}
              color={Colors.light.secondaryTextColor}
            />
          </View>
        )}

        <Switch
          value={value}
          onValueChange={onToggle}
          trackColor={{ false: "transparent", true: "transparent" }}
          thumbColor={"white"}
          className="absolute inset-0 w-full h-full opacity-0"
        />
      </View>
    </TouchableOpacity>
  );
};

export default CustomSwitch;
