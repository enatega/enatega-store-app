import { UPDATE_AVAILABILITY } from "@/lib/apollo/mutations/rider.mutation";
import { STORE_PROFILE } from "@/lib/apollo/queries";
import { useUserContext } from "@/lib/context/global/user.context";
import { useApptheme } from "@/lib/context/theme.context";
import CustomSwitch from "@/lib/ui/useable-components/switch-button";
import { IStoreProfile } from "@/lib/utils/interfaces";
import { MutationTuple, useMutation } from "@apollo/client";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Text, View } from "react-native";
import { showMessage } from "react-native-flash-message";

const CustomDrawerHeader = () => {
  // States
  const [isEnabled, setIsEnabled] = useState(true);

  // Hooks
  const { appTheme } = useApptheme();
  const { t } = useTranslation();
  const { dataProfile, userId } = useUserContext();

  // Queries
  const [toggleAvailablity, { loading }] = useMutation(UPDATE_AVAILABILITY, {
    refetchQueries: [
      { query: STORE_PROFILE, variables: { restaurantId: userId } },
    ],
    onCompleted: () => {
      if (dataProfile?.isAvailable) {
        setIsEnabled(dataProfile?.isAvailable);
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
  }) as MutationTuple<IStoreProfile | undefined, { restaurantId: string }>;

  // Handlers
  async function handleToggleAvailability() {
    try {
      await toggleAvailablity({ variables: { restaurantId: userId ?? "" } });
      console.log("🚀 ~ CustomDrawerHeader ~ userId:", userId);
    } catch (error) {
      console.error("error whilte toggling availabibility", error);
    }
  }

  return (
    <View
      className="w-full -mt-6 h-[110px] flex-row justify-between p-4"
      style={{ backgroundColor: appTheme.primary, marginTop: 1 }}
    >
      <View className="justify-between">
        <View
          className="w-[54px] h-[54px] rounded-full items-center justify-center overflow-hidden"
          style={{ backgroundColor: appTheme.white }}
        >
          {dataProfile?.logo ? (
            <Image
              source={{ uri: dataProfile.logo }}
              width={100}
              height={100}
              resizeMode="cover"
            />
          ) : (
            <Text
              className="text-[16px] font-semibold"
              style={{
                color: appTheme.primary,
              }}
            >
              {dataProfile?.name
                ?.split(" ")[0]
                ?.substring(0, 1)
                ?.toUpperCase()
                ?.concat(
                  "",
                  dataProfile?.name
                    ?.split(" ")[1]
                    ?.substring(0, 1)
                    ?.toUpperCase(),
                ) ?? "JS"}
            </Text>
          )}
        </View>
        <View>
          <Text
            className="font-semibold text-[16px]"
            style={{
              color: appTheme.black,
            }}
          >
            {dataProfile?.name ?? t("store name")}
          </Text>
          <Text
            className="font-medium"
            style={{
              color: appTheme.secondaryTextColor,
            }}
          >
            {dataProfile?._id?.substring(0, 9)?.toUpperCase() ?? t("store id")}
          </Text>
        </View>
      </View>

      <View className="items-end justify-end gap-2">
        <Text
          className="text-md"
          style={{ color: appTheme.secondaryTextColor }}
        >
          {t("Availability")}
        </Text>
        <CustomSwitch
          value={dataProfile?.isAvailable ?? isEnabled}
          isDisabled={loading}
          onToggle={handleToggleAvailability}
        />
        <Text
          className="text-xs font-medium"
          style={{ color: appTheme.secondaryTextColor }}
        >
          {isEnabled ? t("available") : t("notAvailable")}
        </Text>
      </View>
    </View>
  );
};

export default CustomDrawerHeader;
