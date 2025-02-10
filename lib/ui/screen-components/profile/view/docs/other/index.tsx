import { useUserContext } from "@/lib/context/global/user.context";
import { Text, View } from "react-native";

export default function OtherDetailsSection() {
  const { dataProfile } = useUserContext();
  return (
    <View className="flex flex-col justify-between items-start h-[40%] w-full px-4 py-2 my-5">
      <Text className="text-xl font-bold">Other information</Text>
      <View className="flex flex-col gap-3 item-start justify-between w-full  bg-gray-200 h-20 p-4 rounded-md my-4">
        <Text>Email</Text>
        <View className="flex-1 h-12 text-base text-black">
          <Text className="h-12">
            {dataProfile?.email ?? "example@email.com"}
          </Text>
        </View>
      </View>
      <View className="flex flex-col gap-3 item-start justify-between w-full  bg-gray-200 h-20 p-4 rounded-md my-4">
        <Text>Password</Text>
        <View className="flex-1 h-12 text-base text-black">
          <Text className="h-12">
            {dataProfile?.password ?? "Password@123"}
          </Text>
        </View>
      </View>
      <View className="flex flex-col gap-3 item-start justify-between w-full  bg-gray-200 h-20 p-4 rounded-md my-4">
        <Text>Phone</Text>
        <View className="flex-1 h-12 text-base text-black">
          <Text className="h-12">
            {dataProfile?.phone ?? "+324 234 328979"}
          </Text>
        </View>
      </View>
    </View>
  );
}
