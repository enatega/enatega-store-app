import { Image, View } from 'react-native'
import ReactNativeModal from 'react-native-modal'
import cashBagImg from '@/lib/assets/images/success-request.jpg'
import { Text } from 'react-native'
import { router } from 'expo-router'
import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'

export default function SuccessModal({ message }: { message: string }) {
  const [isModalVisible, setIsModalVisible] = useState(true)
  return (
    <ReactNativeModal
      isVisible={isModalVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      className="bg-white justify-center items-center max-h-96 flex mt-72 rounded-xl"
      onBackdropPress={() => {
        setIsModalVisible(false)
        router.back()
      }}
      backdropColor="rgba(0, 0, 0, 0.5)"
      useNativeDriver={true}
    >
      <Ionicons
        name="close-circle-outline"
        size={20}
        className="absolute right-5 top-5 "
        onPress={() => {
          setIsModalVisible(false)
          router.back()
        }}
      />
      <View>
        <Image
          source={cashBagImg}
          className="w-32 h-32"
        />
      </View>
      <View className="flex flex-col gap-3 items-center justify-center self-center mx-auto w-[80%]">
        <Text className="text-lg font-bold text-center">{message}</Text>
        <Text>Usually it takes 1-2 business days</Text>
      </View>
    </ReactNativeModal>
  )
}
