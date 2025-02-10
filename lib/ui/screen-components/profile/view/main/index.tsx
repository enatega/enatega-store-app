import { View } from "react-native";
import DocumentsSection from "../docs/documents";
import OtherDetailsSection from "../docs/other";
import { IRiderProfileMainProps } from "@/lib/utils/interfaces/rider-profile.interface";

export default function ProfileMain({
  setIsFormOpened,
}: IRiderProfileMainProps) {
  return (
    <View className="flex flex-col h-full items-center">
      <DocumentsSection setIsFormOpened={setIsFormOpened} />
      <OtherDetailsSection />
    </View>
  );
}
