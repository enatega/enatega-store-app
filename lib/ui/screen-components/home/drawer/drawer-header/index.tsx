import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";

import { useState } from "react";
import { Colors } from "@/lib/utils/constants";
import CustomSwitch from "@/lib/ui/useable-components/switch-button";

const CustomDrawerHeader = () => {
  // States
  const [isEnabled, setIsEnabled] = useState(true);

  // Hook
  const { t } = useTranslation();

  return (
    <View className="w-full h-[130px] flex-row justify-between p-4">
      <View className="justify-between">
        <View
          className="w-[54px] h-[54px] rounded-full items-center justify-center"
          style={{ backgroundColor: Colors.light.white }}
        >
          <Text
            className="text-[16px] font-semibold"
            style={{
              color: Colors.light.primary,
            }}
          >
            JS
          </Text>
        </View>
        <View>
          <Text
            className="font-semibold text-[16px]"
            style={{
              color: Colors.light.black,
            }}
          >
            rider name
          </Text>
          <Text
            className="font-medium"
            style={{
              color: Colors.light.secondaryTextColor,
            }}
          >
            rider id
          </Text>
        </View>
      </View>

      <View className="items-end justify-end">
        <Text
          className="text-sm font-medium"
          style={{ color: Colors.light.secondaryTextColor }}
        >
          Availibility
        </Text>
        <CustomSwitch
          value={isEnabled}
          onToggle={() => {
            setIsEnabled(!isEnabled);
          }}
        />
        <Text
          className="text-sm font-medium"
          style={{ color: Colors.light.secondaryTextColor }}
        >
          {isEnabled ? t("available") : t("notAvailable")}
        </Text>
      </View>
    </View>
  );
};

export default CustomDrawerHeader;
