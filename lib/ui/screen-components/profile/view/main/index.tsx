import { View } from 'react-native'
import DocumentsSection from '../forms/documents'
import OtherDetailsSection from '../forms/other'

export default function ProfileMain() {
  return (
    <View className="flex flex-col h-full items-center">
      <DocumentsSection />
      <OtherDetailsSection />
    </View>
  )
}
