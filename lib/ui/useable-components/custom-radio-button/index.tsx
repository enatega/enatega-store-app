import { ICustomRadioButtonProps } from "@/lib/utils/interfaces/custom-radio-button.interface";
import { Text } from "react-native";
import { TouchableOpacityProps, TouchableOpacity, View } from "react-native";

export default function CustomRadioButton({
  isSelected,
  label,
  showLabel,
  ...props
}: ICustomRadioButtonProps & TouchableOpacityProps) {
  return (
    <TouchableOpacity {...props} className="flex flex-row gap-3">
      {showLabel && label && <Text>{label}</Text>}
      <View
        className={`border ${isSelected ? "border-[#8ADC68]" : "border-gray-300"} rounded-full p-1 w-6 h-6 items-center justify-center`}
      >
        <View
          className={`${isSelected ? "bg-[#8ADC68]" : "bg-white"} rounded-full w-4 h-4`}
        />
      </View>
      <TouchableOpacity />
    </TouchableOpacity>
  );
}
