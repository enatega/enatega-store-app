import { useApptheme } from "@/lib/context/theme.context";
import { IFlashMessageComponentProps } from "@/lib/utils/interfaces/flash-message.interface";
import { showMessage } from "react-native-flash-message";

export default function FlashMessageComponent(
  props: IFlashMessageComponentProps,
) {
  const { appTheme } = useApptheme();

  showMessage({
    message: props.message,
    backgroundColor: appTheme.lowOpacityPrimaryColor,
    position: "top", // Center position
    style: {
      borderRadius: 40,
      minHeight: 50,
    },
    titleStyle: {
      color: appTheme.fontMainColor,
    },
  });
}
