import {
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import FormHeader from "../form-header";
import { Dispatch, SetStateAction, useState } from "react";
import { UploadIcon } from "@/lib/assets/svg";
import { CustomContinueButton } from "@/lib/ui/useable-components";
import * as ImagePicker from "expo-image-picker";
import { ICloudinaryResponse } from "@/lib/utils/interfaces/cloudinary.interface";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { showMessage } from "react-native-flash-message";
import { useMutation } from "@apollo/client";
import { UPDATE_VEHICLE } from "@/lib/apollo/mutations/rider.mutation";
import { useUserContext } from "@/lib/context/global/user.context";
import { RIDER_PROFILE } from "@/lib/apollo/queries";
import { TRiderProfileBottomBarBit } from "@/lib/utils/types/rider";

export default function VehiclePlateForm({
  setIsFormOpened,
}: {
  setIsFormOpened: Dispatch<SetStateAction<TRiderProfileBottomBarBit>>;
}) {
  // Contexts
  const { userId } = useUserContext();

  // Local states
  // States
  const [isLoading, setIsLoading] = useState({
    isUploading: false,
    isSubmitting: false,
  });
  const [cloudinaryResponse, setCloudinaryResponse] =
    useState<ICloudinaryResponse | null>(null);
  const [formData, setFormData] = useState({
    image: "",
    number: "",
  });
  // Mutations
  const [mutateLicense] = useMutation(UPDATE_VEHICLE, {
    onError: (error) => {
      showMessage({
        message: "Failed to update license",
        type: "danger",
      });
      console.error("Failed to update license", error);
    },
    onCompleted: () => {
      setIsLoading({
        isSubmitting: false,
        isUploading: false,
      });
    },
    refetchQueries: [{ query: RIDER_PROFILE, variables: { id: userId } }],
  });

  const pickImage = async () => {
    try {
      setIsLoading((prev) => ({
        ...prev,
        isUploading: true,
      }));
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
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
                setFormData((prev) => ({ ...prev, image: data.secure_url }));
              })
              .catch((err) => {
                console.error(err);
                setIsLoading((prev) => ({
                  ...prev,
                  isUploading: false,
                }));
              }),
          )
          .catch((err) => console.error({ err }));
        setIsLoading((prev) => ({
          ...prev,
          isUploading: false,
        }));
      }
    } catch (error) {
      console.error(error);
      return showMessage({
        message: "Failed to upload image",
        type: "danger",
      });
    } finally {
      setIsLoading((prev) => ({
        ...prev,
        isUploading: false,
      }));
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      setIsLoading((prev) => ({
        ...prev,
        isSubmitting: true,
      }));
      if (!formData.number) {
        return showMessage({
          message: "Please enter a license number",
          type: "danger",
        });
      } else if (!formData.image) {
        return showMessage({
          message: "Please upload an image",
          type: "danger",
        });
      }
      await mutateLicense({
        variables: {
          updateRiderVehicleDetailsId: userId,
          vehicleDetails: formData,
        },
      });
      setIsFormOpened(null);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading((prev) => ({
        ...prev,
        isSubmitting: false,
      }));
    }
  };
  return (
    <View className="w-full">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex flex-col justify-between w-full p-3 h-full mt-0 -z-10">
          <FormHeader title="Vehicle Plate" />
          <View>
            <View className="flex flex-col w-full my-2">
              <Text>Plate No</Text>
              <TextInput
                value={formData.number}
                onChangeText={(licenseNo) =>
                  handleInputChange("number", licenseNo)
                }
                className="w-full rounded-md border border-gray-300 p-3 my-2"
              />
            </View>
            <View className="flex flex-col w-full my-2">
              <Text>Add Registration Document</Text>
              {!cloudinaryResponse?.secure_url ? (
                <TouchableOpacity
                  className="w-full rounded-md border border-dashed border-gray-300 p-3 h-28 items-center justify-center"
                  onPress={pickImage}
                >
                  {isLoading.isUploading ? (
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
              <CustomContinueButton
                title={isLoading.isSubmitting ? "Please wait..." : "Add"}
                onPress={handleSubmit}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
