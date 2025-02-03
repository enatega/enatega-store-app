import { IWithdrawModalProps } from "@/lib/utils/interfaces/withdraw.interface";
import { Text } from "react-native";
import { ReactNativeModal } from "react-native-modal";
import { View } from "react-native";
import { CustomContinueButton } from "@/lib/ui/useable-components";
import { TextInput } from "react-native";
import { useState } from "react";

export default function WithdrawModal({
  isBottomModalOpen,
  setIsBottomModalOpen,
  currentTotal,
  handleFormSubmission,
  amountErrMsg,
  setAmountErrMsg,
  withdrawRequestLoading,
}: IWithdrawModalProps) {
  // States
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [ModalMarginTop, setModalMargintTop] = useState(480);

  // Handlers
  function handleTextChange(val: string) {
    setWithdrawAmount(val);
    setAmountErrMsg("");
  }
  return (
    <ReactNativeModal
      isVisible={isBottomModalOpen}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      onBackdropPress={() => {
        setIsBottomModalOpen(false);
      }}
      useNativeDriver={true}
      style={{
        maxHeight: 350,
        width: "100%",
        height: "100%",
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 5,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        marginLeft: 0,
        marginTop: ModalMarginTop,
        shadowOpacity: 0.25,
        shadowRadius: 4,
      }}
    >
      <View className="flex flex-col justify-between h-[75%] p-2 items-center w-full">
        <View className="flex flex-row justify-between w-full  border-b-gray-300 border-b">
          <Text className="font-bold text-lg py-2">Available Amount</Text>
          <Text className="font-bold text-lg">${currentTotal}</Text>
        </View>
        <View className=" flex flex-col gap-3 w-full">
          <Text className="font-bold text-lg">Enter Amount</Text>
          <TextInput
            value={withdrawAmount}
            onChangeText={(val) => handleTextChange(val)}
            maxLength={9999999}
            onFocus={() => setModalMargintTop(200)}
            onBlur={() => setModalMargintTop(480)}
            placeholder="$0.00"
            keyboardType="number-pad"
            returnKeyType="done"
            className={`${amountErrMsg ? "border-red-600" : "border-gray-300"} border w-full h-12 rounded p-3 placeholder:text-black`}
          />
          {amountErrMsg && (
            <Text className="text-red-500 text-sm">{amountErrMsg}</Text>
          )}
        </View>
        <View>
          <CustomContinueButton
            title={
              !withdrawRequestLoading ? "Confirm Withdraw" : "Please wait..."
            }
            disabled={withdrawRequestLoading}
            onPress={() =>
              handleFormSubmission(Number(withdrawAmount)).then(() =>
                setWithdrawAmount(""),
              )
            }
          />
        </View>
      </View>
    </ReactNativeModal>
  );
}
