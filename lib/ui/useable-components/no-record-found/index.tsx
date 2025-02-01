// Icons
import { Ionicons } from '@expo/vector-icons'

// Core
import { Text, View } from 'react-native'

export default function NoRecordFound() {
  return (
    <View className="items-center flex flex-row my-24 justify-center">
      <Text className="font-bold text-center">No record found </Text>
      <Ionicons
        name="sad-outline"
        size={20}
      />
    </View>
  )
}
