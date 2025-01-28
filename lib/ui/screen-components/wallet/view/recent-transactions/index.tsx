import { Text, View } from 'react-native'

export default function RecentTransaction() {
  return <View className="flex flex-column justify-between items-center">
    <View className="flex items-center">
      <Text className="text-gray-600 text-sm">Recent Transaction</Text>
    </View>
    <View className='flex flex-col gap-1'>
    <View className="flex items-center gap-3 shadow shadow-gray-700">
      <Text className="text-gray-500 text-sm">Transaction ID: 1234567890</Text>
      <Text className="text-gray-500 text-sm">Date: 12/04/2022</Text>
    </View>
    <View className="flex items-center gap-3 shadow shadow-gray-700">
      <Text className="text-gray-500 text-sm">Amount: $100.00</Text>
      <Text className="text-gray-500 text-sm">Type: Received</Text>
    </View>
    </View>
  </View>
}
