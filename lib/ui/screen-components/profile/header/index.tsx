// Hooks
import { useUserContext } from "@/lib/context/global/user.context";
import { useTranslation } from "react-i18next";

// Constants

// Core
import { useApptheme } from "@/lib/context/theme.context";
import { BlurTint, BlurView } from "expo-blur";
import { Image, ImageBackground, Text, View } from "react-native";

export default function ProfileHeader() {
  // Hooks
  const { t } = useTranslation();
  const { appTheme, currentTheme } = useApptheme();
  const { dataProfile } = useUserContext();

  return (
    <ImageBackground
      source={{ uri: dataProfile?.image as string }}
      width={100}
      height={100}
      resizeMode="cover"
      className="backdrop-blur-3xl"
    >
      <View
        className={`justify-between flex-row h-[130px] w-[55%] items-center p-4 shadow-xl `}
      >
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
                textShadowColor: appTheme.black,
                textShadowOffset: { width: 22, height: 22 },
                textShadowRadius: 40,
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
        <BlurView intensity={25} tint={currentTheme as BlurTint}>
          <Text
            className={`font-semibold text-[16px]`}
            style={{
              color: appTheme.fontMainColor,
              fontWeight: "bold",
              textShadowColor: appTheme.black,
              textShadowOffset: { width: 22, height: 22 },
              textShadowRadius: 40,
            }}
          >
            {dataProfile?.name ?? t("store name")}
          </Text>
          <Text
            className="font-medium"
            style={{
              color: appTheme.secondaryTextColor,
              fontWeight: "condensedBold",
            }}
          >
            {dataProfile?._id.substring(0, 9).toUpperCase() ?? t("store id")}
          </Text>
        </BlurView>
      </View>
    </ImageBackground>
  );
}
