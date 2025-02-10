// Components
import { UPDATE_BUSINESS_DETAILS } from "@/lib/apollo/mutations/rider.mutation";
import { RIDER_PROFILE } from "@/lib/apollo/queries";
import { useUserContext } from "@/lib/context/global/user.context";
import { CustomContinueButton } from "@/lib/ui/useable-components";

// Hooks
import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";

// Core
import {
  TouchableWithoutFeedback,
  Text,
  TextInput,
  View,
  Keyboard,
} from "react-native";
import { showMessage } from "react-native-flash-message";

export default function BankManagementMain() {
  // Hooks
  const { t } = useTranslation();

  // Contexts
  const { userId, dataProfile } = useUserContext();
  console.log("🚀 ~ BankManagementMain ~ dataProfile:", {
    bussinessDetails: dataProfile?.bussinessDetails,
  });

  // states
  const [isError, setIsError] = useState({
    field: "",
    message: "",
  });
  const [formData, setFormData] = useState({
    bankName: "",
    accountName: "",
    accountNumber: "",
    accountCode: "",
  });

  // Mutations
  const [mutateBankDetails, { loading: areBankDetailsLoading }] = useMutation(
    UPDATE_BUSINESS_DETAILS,
    {
      onError: (error) => {
        showMessage({
          message: "Failed to update bank details",
          type: "danger",
        });
        console.error("Failed to update bank details", error);
      },
      onCompleted: () => {
        setFormData({
          bankName: "",
          accountName: "",
          accountNumber: "",
          accountCode: "",
        });
        showMessage({
          message: "Bank details updated successfully",
          type: "success",
        });
        setIsError({
          field: "",
          message: "",
        });
      },
      refetchQueries: [{ query: RIDER_PROFILE, variables: { id: userId } }],
    },
  );

  // Handlers
  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };
  const handleSubmit = async () => {
    try {
      if (!formData.bankName) {
        setIsError({
          field: "bankName",
          message: "Bank Name is required",
        });
        return showMessage({
          message: "Bank Name is required",
          type: "danger",
        });
      } else if (!formData.accountName) {
        setIsError({
          field: "accountName",
          message: "Account Name is required",
        });
        return showMessage({
          message: "Account Name is required",
          type: "danger",
        });
      } else if (!formData.accountNumber) {
        setIsError({
          field: "accountNumber",
          message: "Account Number is required",
        });
        return showMessage({
          message: "Account Number is required",
          type: "danger",
        });
      } else if (!formData.accountCode) {
        setIsError({
          field: "accountCode",
          message: "Account Code is required",
        });
        return showMessage({
          message: "Account Code is required",
          type: "danger",
        });
      }
      await mutateBankDetails({
        variables: {
          updateRiderBussinessDetailsId: userId,
          bussinessDetails: {
            bankName: formData.bankName,
            accountName: formData.accountName,
            accountNumber: Number(formData.accountNumber),
            accountCode: formData.accountCode,
          },
        },
      });
      Alert.alert(
        "Bank Details Updated",
        "Your bank details have been updated successfully.",
      );
    } catch (error) {
      console.log(error);
    }
  };

  // UseEffect
  useEffect(() => {
    if (
      !areBankDetailsLoading &&
      dataProfile?.bussinessDetails &&
      Object.values(dataProfile?.bussinessDetails).length > 0
    ) {
      setFormData({
        bankName: dataProfile?.bussinessDetails.bankName ?? "",
        accountName: dataProfile?.bussinessDetails.accountName ?? "",
        accountNumber: String(
          dataProfile?.bussinessDetails.accountNumber ?? "",
        ),
        accountCode: dataProfile?.bussinessDetails.accountCode ?? "",
      });
    }
  }, [dataProfile?.bussinessDetails, areBankDetailsLoading]);
  return (
    <View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex flex-col justify-between items-center w-full h-[75%] my-6 px-4">
          <View className="flex flex-col w-full items-start justify-start gap-2">
            <Text className="text-lg font-normal">Bank Name</Text>
            <TextInput
              className={`min-w-[100%] rounded-md border ${isError.field === "bankName" ? "border-red-600 border-2" : "border-2 border-gray-300"} p-3 my-2`}
              value={formData.bankName}
              placeholder="Swiss Bank"
              onChangeText={(val) => {
                setIsError({ field: "", message: "" });
                handleChange("bankName", val);
              }}
            />
          </View>
          <View className="flex flex-col w-full items-start justify-start gap-2">
            <Text className="text-lg font-normal">
              {t("Account holder name")}
            </Text>
            <TextInput
              className={`min-w-[100%] rounded-md border ${isError.field === "accountName" ? "border-red-600 border-2" : "border-2 border-gray-300"} p-3 my-2`}
              value={formData.accountName}
              placeholder="Micheal Kim"
              onChangeText={(val) => {
                setIsError({ field: "", message: "" });
                handleChange("accountName", val);
              }}
            />
          </View>
          <View className="flex flex-col w-full items-start justify-start gap-2">
            <Text className="text-lg font-normal">IBAN / Swift / BSB</Text>
            <TextInput
              className={`min-w-[100%] rounded-md border ${isError.field === "accountCode" ? "border-red-600 border-2" : "border-2 border-gray-300"} p-3 my-2`}
              value={formData.accountCode}
              placeholder="PK33"
              onChangeText={(val) => {
                setIsError({ field: "", message: "" });
                handleChange("accountCode", val);
              }}
            />
          </View>
          <View className="flex flex-col w-full items-start justify-start gap-2">
            <Text className="text-lg font-normal">Account Number</Text>
            <TextInput
              className={`min-w-[100%] rounded-md border ${isError.field === "accountNumber" ? "border-red-600 border-2" : "border-2 border-gray-300"} p-3 my-2`}
              value={formData.accountNumber}
              placeholder="7838246824682346"
              onChangeText={(val) => {
                setIsError({ field: "", message: "" });
                handleChange("accountNumber", val);
              }}
            />
          </View>
          <View>
            <CustomContinueButton
              title={areBankDetailsLoading ? "Please wait..." : "Confirm"}
              onPress={handleSubmit}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
