// Hooks
import { useUserContext } from "@/lib/context/global/user.context";
import { useTranslation } from "react-i18next";

// Constants
import { Colors } from "@/lib/utils/constants";

// Core
import { Image, ImageBackground, Text, View } from "react-native";

export default function ProfileHeader() {
  // Hooks
  const { t } = useTranslation();
  const { dataProfile } = useUserContext();

  return (
    <ImageBackground
      source={{ uri: dataProfile?.image as string }}
      width={100}
      height={100}
      resizeMode="cover"
    >
      <View
        className={`justify-between flex-row h-[130px] w-[55%] items-center p-4`}
      >
        <View
          className="w-[54px] h-[54px] rounded-full items-center justify-center overflow-hidden"
          style={{ backgroundColor: Colors.light.white }}
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
          )}
        </View>
        <View
          style={{
            shadowOffset: { width: 20, height: 20 },
            shadowOpacity: 0.85,
            shadowColor: "#FFFF",
            shadowRadius: 35,
            width: "100%",
          }}
        >
          <Text
            className={`font-semibold text-[16px]`}
            style={{
              color: Colors.light.black,
              textShadowColor: Colors.light.primary,
              textShadowOffset: { width: 20, height: 20 },
              textShadowRadius: 15,
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
    </ImageBackground>
  );
}
