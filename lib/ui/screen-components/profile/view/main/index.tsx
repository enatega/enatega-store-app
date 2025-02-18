//
import { View } from "react-native";
import DocumentsSection from "../docs/documents";

export default function ProfileMain() {
  return (
    <View className="flex flex-col h-full items-center">
      <DocumentsSection />
    </View>
  );
}
