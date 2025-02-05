import { useUserContext } from "@/lib/context/global/user.context";
import { Text, TextInput, View } from "react-native";

export default function OtherDetailsSection() {
  const { dataProfile } = useUserContext();
  return (
    <View className="flex flex-col justify-between items-start h-[40%] w-full px-5 py-2 my-5">
      <Text className="text-xl font-bold">Other information</Text>
      <View className="flex flex-col gap-3 item-start justify-between w-96  bg-gray-200 h-20 p-4 rounded-md my-4">
        <Text>Email</Text>
        <TextInput
          className="flex-1 h-12 text-base text-black"
          placeholder="example@email.com"
          value={dataProfile?.email ?? ""}
        />
      </View>
      <View className="flex flex-col gap-3 item-start justify-between w-96  bg-gray-200 h-20 p-4 rounded-md my-4">
        <Text>Password</Text>
        <TextInput
          className="flex-1 h-12 text-base text-black"
          placeholder="A-zZ0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
          secureTextEntry={true}
          value={dataProfile?.password ?? ""}
        />
      </View>
      <View className="flex flex-col gap-3 item-start justify-between w-96  bg-gray-200 h-20 p-4 rounded-md my-4">
        <Text>Phone</Text>
        <TextInput
          className="flex-1 h-12 text-base text-black"
          placeholder="+21 234342312"
          value={dataProfile?.phone ?? ""}
        />
      </View>
    </View>
  );
}
