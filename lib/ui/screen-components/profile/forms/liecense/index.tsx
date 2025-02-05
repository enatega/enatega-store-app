import {
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import FormHeader from "../form-header";
import { useState } from "react";
import { Calendar, DateData } from "react-native-calendars";
import { UploadIcon } from "@/lib/assets/svg";
import { CustomContinueButton } from "@/lib/ui/useable-components";
import * as ImagePicker from "expo-image-picker";
// import { upload } from 'cloudinary-react-native'
// import { cld, cloudinary_upload_options } from '@/lib/services/coudinary'
// import {
//   UploadApiErrorResponse,
//   UploadApiResponse,
// } from 'cloudinary-react-native/lib/typescript/src/api/upload/model/params/upload-params'
export default function DrivingLicenseForm() {
  // States
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    // if (!result.canceled) {
    //   await upload(cld, {
    //     file: result.assets[0].uri,
    //     options: cloudinary_upload_options,
    //     callback: (
    //       err?: UploadApiErrorResponse,
    //       callResult?: UploadApiResponse,
    //     ) => {
    //       console.log({ err, callResult })
    //     },
    //   })
    // }
  };

  const [formData, setFormData] = useState({
    expiryDate: "",
    image: "",
    number: "",
  });
  const handleInputChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };
  return (
    <View className="w-full">
      {isCalendarVisible && (
        <View
          style={{
            top: -400,
            position: "absolute",
            width: "95%",
            gap: 10,
            backgroundColor: "white",
            padding: 8,
            marginLeft: 10,
            borderRadius: 12,
          }}
        >
          <Calendar
            initialDate={formData.expiryDate}
            onDayPress={(day: DateData) =>
              handleInputChange("expiryDate", day.dateString)
            }
            markedDates={{
              [formData.expiryDate]: { selected: true, marked: true },
            }}
          />
          <CustomContinueButton
            title="Done"
            onPress={() => setIsCalendarVisible(false)}
          />
        </View>
      )}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex flex-col justify-between w-full p-3 h-full mt-0">
          <FormHeader title="Driving License" />
          <View>
            <View className="flex flex-col w-full my-2">
              <Text>License No</Text>
              <TextInput
                value={formData.number}
                onChangeText={(licenseNo) =>
                  handleInputChange("number", licenseNo)
                }
                className="w-full rounded-md border border-gray-300 p-3"
              />
            </View>
            <View className="flex flex-col w-full my-2">
              <Text>License Expiry Date</Text>
              <TouchableOpacity
                onPress={() => setIsCalendarVisible(true)}
                className="w-full rounded-md border border-gray-300 p-3"
              >
                <Text className="text-gray-400">
                  {formData.expiryDate ?? new Date().toDateString()}
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex flex-col w-full my-2">
              <Text>Add License Document</Text>
              <TouchableOpacity
                className="w-full rounded-md border border-dashed border-gray-300 p-3 h-28 items-center justify-center"
                onPress={pickImage}
              >
                <UploadIcon />
              </TouchableOpacity>
            </View>
            <View>
              <CustomContinueButton title="Add" onPress={() => {}} />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
