import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";

import { useState } from "react";
import { Colors } from "@/lib/utils/constants";
import CustomSwitch from "@/lib/ui/useable-components/switch-button";
import { useUserContext } from "@/lib/context/global/user.context";
import { UPDATE_AVAILABILITY } from "@/lib/apollo/mutations/rider.mutation";
import { MutationTuple, useMutation } from "@apollo/client";
import { STORE_PROFILE } from "@/lib/apollo/queries";
import { showMessage } from "react-native-flash-message";
import { IStoreProfile } from "@/lib/utils/interfaces";

const CustomDrawerHeader = () => {
  // States
  const [isEnabled, setIsEnabled] = useState(true);

  // Hook
  const { t } = useTranslation();
  const { dataProfile, userId } = useUserContext();

  // Queries
  const [toggleAvailablity, { loading }] = useMutation(UPDATE_AVAILABILITY, {
    refetchQueries: [
      { query: STORE_PROFILE, variables: { restaurantId: userId } },
    ],
    onCompleted: () => {
      if (dataProfile?.available) {
        setIsEnabled(dataProfile?.available);
      }
    },
    onError: (error) => {
      showMessage({
        message:
          error?.graphQLErrors[0]?.message ||
          error?.networkError?.message ||
          error?.networkError?.message ||
          t("Unable to update availability"),
      });
    },
  }) as MutationTuple<IStoreProfile | undefined, { id: string }>;
  return (
    <View
      className="w-full -mt-6 h-[110px] flex-row justify-between p-4"
      style={{ backgroundColor: Colors.light.primary }}
    >
      <View className="justify-between">
        <View
          className="w-[54px] h-[54px] rounded-full items-center justify-center overflow-hidden"
          style={{ backgroundColor: Colors.light.white }}
        >
          <Text
            className="text-[16px] font-semibold"
            style={{
              color: Colors.light.primary,
            }}
          >
            {dataProfile?.name
              .split(" ")[0]
              .substring(0, 1)
              .toUpperCase()
              .concat(
                "",
                dataProfile?.name.split(" ")[1].substring(0, 1).toUpperCase(),
              ) ?? "JS"}
          </Text>
        </View>
        <View>
          <Text
            className="font-semibold text-[16px]"
            style={{
              color: Colors.light.black,
            }}
          >
            {dataProfile?.name ?? t("store name")}
          </Text>
          <Text
            className="font-medium"
            style={{
              color: Colors.light.secondaryTextColor,
            }}
          >
            {dataProfile?._id.substring(0, 9).toUpperCase() ?? t("store id")}
          </Text>
        </View>
      </View>

      <View className="items-end justify-end gap-2">
        <Text
          className="text-md"
          style={{ color: Colors.light.secondaryTextColor }}
        >
          Availability
        </Text>
        <CustomSwitch
          value={dataProfile?.available ?? isEnabled}
          isDisabled={loading}
          onToggle={async () =>
            await toggleAvailablity({ variables: { id: userId ?? "" } })
          }
        />
        <Text
          className="text-xs font-medium"
          style={{ color: Colors.light.secondaryTextColor }}
        >
          {isEnabled ? t("available") : t("notAvailable")}
        </Text>
      </View>
    </View>
  );
};

export default CustomDrawerHeader;
