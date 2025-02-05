// Core
import { SafeAreaView } from "react-native";
import { useState } from "react";

// Components
import ProfileHeader from "../../screen-components/profile/header";
import ProfileMain from "../../screen-components/profile/view/main";

// Types & Interfaces
import { TRiderProfileBottomBarBit } from "@/lib/utils/types/rider";
import DrivingLicenseForm from "../../screen-components/profile/forms/liecense";
import VehiclePlateForm from "../../screen-components/profile/forms/vehicle";
import ReactNativeModal from "react-native-modal";

export default function ComponentName() {
  const [isFormOpened, setIsFormOpened] =
    useState<TRiderProfileBottomBarBit>(null);
  return (
    <SafeAreaView>
      <ProfileHeader />
      <ProfileMain
        isFormOpened={isFormOpened}
        setIsFormOpened={setIsFormOpened}
      />
      {isFormOpened !== null && (
        <ReactNativeModal
          isVisible={isFormOpened !== null}
          animationIn={"slideInUp"}
          animationOut={"slideOutDown"}
          onBackdropPress={() => {
            setIsFormOpened(null);
          }}
          style={{
            maxHeight: 390,
            width: "100%",
            height: "100%",
            backgroundColor: "#fff",
            borderRadius: 20,
            padding: 2,
            alignItems: "center",
            justifyContent: "flex-start",

            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            marginLeft: 0,
            marginTop: 435,
            shadowOpacity: 0.25,
            shadowRadius: 4,
          }}
        >
          {isFormOpened === "LICENSE_FORM" && <DrivingLicenseForm />}
          {isFormOpened === "VEHICLE_FORM" && <VehiclePlateForm />}
          {isFormOpened === null && <></>}
        </ReactNativeModal>
      )}
    </SafeAreaView>
  );
}
