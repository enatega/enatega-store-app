// Hooks
import { useUserContext } from '@/lib/context/global/user.context'

// Core
import { Text, TouchableOpacity, View } from 'react-native'

export default function DocumentsSection() {
  const { dataProfile } = useUserContext()
  return (
    <View className="flex flex-col h-[20%] w-full justify-between items-center">
      <View className="flex flex-col gap-3 items-start justify-center px-5 w-full border-b-2  border-b-gray-200 py-3">
        <View className="flex flex-row w-full justify-between">
          <Text className="font-bold">Driving License</Text>
          <TouchableOpacity>
            <Text className="font-semibold text-[#0EA5E9]">Add</Text>
          </TouchableOpacity>
        </View>
        <View
          className={`${!dataProfile?.bussinessDetails.bankName ? 'bg-[#E0F2FE]' : 'bg-[#FEE2E2]'} p-3 border rounded-3xl border-[#E0F2FE]`}
        >
          <Text
            className={`${!dataProfile?.bussinessDetails.bankName ? 'text-[#0D99FF]' : 'text-[#991B1B]'} font-semibold`}
          >
            {!dataProfile?.bussinessDetails.bankName ?
              'Submitted Data'
            : 'Missing Data'}
          </Text>
        </View>
      </View>
      <View className="flex flex-col gap-3 items-start justify-center px-5 w-full border-b-2  border-b-gray-200 py-3">
        <View className="flex flex-row w-full justify-between">
          <Text className="font-bold">Vehicle Plate</Text>
          <TouchableOpacity>
            <Text className="font-semibold text-[#0EA5E9]">Add</Text>
          </TouchableOpacity>
        </View>
        <View
          className={`${dataProfile?.bussinessDetails.bankName ? 'bg-[#E0F2FE]' : 'bg-[#FEE2E2]'} p-3 border rounded-3xl border-[#E0F2FE]`}
        >
          <Text
            className={`${dataProfile?.bussinessDetails.bankName ? 'text-[#0D99FF]' : 'text-[#991B1B]'} font-semibold`}
          >
            {dataProfile?.bussinessDetails.bankName ?
              'Submitted Data'
            : 'Missing Data'}
          </Text>
        </View>
      </View>
    </View>
  )
}
