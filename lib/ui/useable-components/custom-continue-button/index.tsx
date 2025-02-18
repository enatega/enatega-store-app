import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity } from "react-native";
import { TouchableOpacityProps } from "react-native-gesture-handler";

export default function CustomContinueButton({
  title,
  ...props
}: { title: string } & TouchableOpacityProps) {
  // Hooks
  const { t } = useTranslation();
  return (
    <TouchableOpacity
      {...props}
      className="py-5 min-w-96 lg:px-52 rounded-[80] items-center justify-center bg-[#90E36D]"
    >
      <Text className="text-[16px]">{t(title)}</Text>
    </TouchableOpacity>
  );
}
