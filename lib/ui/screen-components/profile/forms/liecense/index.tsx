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
import { ICloudinaryResponse } from "@/lib/utils/interfaces/cloudinary.interface";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { showMessage } from "react-native-flash-message";

export default function DrivingLicenseForm() {
  // States
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [cloudinaryResponse, setCloudinaryResponse] =
    useState<ICloudinaryResponse | null>(null);

  const uriToBlob = async (uri: string) => {
    const response = await fetch(uri);
    return await response.blob();
  };
  const pickImage = async () => {
    try {
      setIsUploading(true);
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const imageBlob = await uriToBlob(result.assets[0].uri);
        console.log("🚀 ~ pickImage ~ imageBlob:", imageBlob);
        const formData = new FormData();
        formData.append("file", {
          uri: result.assets[0].uri,
          name: `license_${Date.now()}.jpg`, // Unique name
          type: "image/jpeg",
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);
        formData.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET);
        formData.append("cloud_name", process.env.CLOUDINARY_CLOUD_NAME);
        await fetch(process.env.CLOUDINARY_UPLOAD_URL, {
          method: "POST",
          body: formData,
        })
          .then((resp) =>
            resp
              .json()
              .then((data: ICloudinaryResponse) => {
                setCloudinaryResponse(data);
              })
              .catch((err) => {
                console.error(err);
                setIsUploading(false);
              }),
          )
          .catch((err) => console.error({ err }));
        setIsUploading(false);
      }
    } catch (error) {
      console.error(error);
      return showMessage({
        message: "Failed to upload image",
        type: "danger",
      });
    } finally {
      setIsUploading(false);
    }
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
                className="w-full rounded-md border border-gray-300 p-3 my-2"
              />
            </View>
            <View className="flex flex-col w-full my-2">
              <Text>License Expiry Date</Text>
              <TouchableOpacity
                onPress={() => setIsCalendarVisible(true)}
                className="w-full rounded-md border border-gray-300 p-3 my-2"
              >
                <Text className="text-gray-400">
                  {formData.expiryDate ?? new Date().toDateString()}
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex flex-col w-full my-2">
              <Text>Add License Document</Text>
              {!cloudinaryResponse?.secure_url ? (
                <TouchableOpacity
                  className="w-full rounded-md border border-dashed border-gray-300 p-3 h-28 items-center justify-center"
                  onPress={pickImage}
                >
                  {isUploading ? (
                    <MotiView>
                      <Skeleton width={90} height={20} colorMode="light" />
                    </MotiView>
                  ) : (
                    <UploadIcon />
                  )}
                </TouchableOpacity>
              ) : (
                <View className="flex flex-row justify-between border border-gray-300 rounded-md p-4 my-2">
                  <View className="flex flex-row gap-2">
                    <Ionicons name="image" size={20} color="#3F51B5" />
                    <Text className="text-[#3F51B5] border-b-2 border-b-[#3F51B5]">
                      {cloudinaryResponse.original_filename}.
                      {cloudinaryResponse.format}
                    </Text>
                  </View>
                  <View className="flex flex-row">
                    <Text>{cloudinaryResponse.bytes / 1000}KB</Text>
                    <Link
                      download={cloudinaryResponse.secure_url}
                      href={cloudinaryResponse.secure_url}
                      className="text-[#9CA3AF] text-xs"
                    >
                      <Ionicons size={18} name="download" color="#6B7280" />
                    </Link>
                  </View>
                </View>
              )}
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
