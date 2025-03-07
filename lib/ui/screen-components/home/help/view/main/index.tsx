import { useApptheme } from "@/lib/context/theme.context";
import { FAQs } from "@/lib/utils/constants";
import { FontAwesome } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { useFocusEffect } from "expo-router";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { showMessage } from "react-native-flash-message";
import HelpAccordian from "../../accordian";

export default function HelpMain() {
  const { t } = useTranslation();
  const { appTheme } = useApptheme();

  const openWhatsAppChat = async () => {
    const phoneNumber = "+14232600408";

    if (Platform.OS === "android") {
      const androidUrl = `whatsapp://send?phone=${phoneNumber}`;

      try {
        const supported = Linking.canOpenURL(androidUrl);
        console.log("🚀 ~ openWhatsAppChat ~ supported:", supported);
        if (supported) {
          await Linking.openURL(androidUrl);
          console.log("WhatsApp opened successfully");
        }
      } catch (error) {
        console.log(error);
        return showMessage({
          type: "info",
          message:
            "WhatsApp is not installed on the device, please install it first and then try again.",
          duration: 1000,
          animated: true,
          animationDuration: 500,
        });
      }
    } else if (Platform.OS === "ios") {
      const iosUrl = `https://wa.me/${phoneNumber.replace("+", "")}`;
      console.log("Attempting to open URL:", iosUrl);

      try {
        const supported = Linking.canOpenURL(iosUrl);
        console.log("Can open URL:", supported);

        if (supported) {
          await Linking.openURL(iosUrl);
        } else {
          console.log(
            "WhatsApp is not installed on the device, please install it first and then try again.",
          );
        }
      } catch (error) {
        console.log(error);
        return showMessage({
          type: "info",
          message:
            "WhatsApp is not installed on the device, please install it first and then try again.",
          duration: 1000,
          animated: true,
          animationDuration: 500,
        });
      }
    }
  };
  useFocusEffect(() => {
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("white");
    }
  });

  return (
    <View
      className="flex flex-col w-full h-[95%]"
      style={{ backgroundColor: appTheme.themeBackground }}
    >
      <StatusBar barStyle="light-content" />

      <View className="flex w-full h-full items-start justify-start p-4">
        <FlatList
          className="flex flex-col w-[99%] ml-1 overflow-x-hidden"
          data={FAQs}
          keyExtractor={(item) => "Faq-" + item.id}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View className="h-4" />}
          renderItem={({ item, index }) => (
            <HelpAccordian
              heading={t(item.heading)}
              key={index + "_accordian_help"}
              isLast={index === FAQs.length - 1}
            >
              <Text style={{ color: appTheme.fontSecondColor }}>
                {t(item.description)}
              </Text>
            </HelpAccordian>
          )}
        />

        <View className="bottom-6 w-full flex items-center">
          <TouchableOpacity
            activeOpacity={0.7}
            className="w-[90%] h-12 rounded-full flex flex-row items-center justify-center gap-2 shadow-lg"
            style={{ backgroundColor: appTheme.primary }}
            onPress={openWhatsAppChat}
          >
            <FontAwesome name="whatsapp" size={24} color={appTheme.white} />
            <Text
              style={{ color: appTheme.white, fontSize: 18, fontWeight: "600" }}
            >
              {t("whatsAppText")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
