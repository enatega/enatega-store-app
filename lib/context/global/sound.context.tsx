/* eslint-disable @typescript-eslint/no-require-imports */
import { useContext, useEffect, useState, createContext } from "react";
import { Audio } from "expo-av";
// Interface
import {
  ISoundContext,
  ISoundContextProviderProps,
} from "@/lib/utils/interfaces";
// Context/Hooks
import { AuthContext } from "./auth.context";
import { useUserContext } from "./user.context";
import { IOrder } from "@/lib/utils/interfaces/order.interface";

const SoundContext = createContext<ISoundContext>({} as ISoundContext);

export const SoundProvider = ({ children }: ISoundContextProviderProps) => {
  // State
  const [sound, setSound] = useState<Audio.SoundObject>(
    {} as Audio.SoundObject
  );
  // Context/Hooks
  const { assignedOrders } = useUserContext();
  const { logout } = useContext(AuthContext);

  // Handlers

  const playSound = async () => {
    await stopSound();
    const { sound: newSound } = await Audio.Sound.createAsync(
      require("@/lib/assets/sound/beep3.mp3")
    );
    await newSound.setIsLoopingAsync(true);
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      interruptionModeIOS: (Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS = 2),
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid:
        (Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS = 2),
      playThroughEarpieceAndroid: false,
    });
    await newSound.playAsync();

    setSound(newSound);
  };

  const stopSound = async () => {
    if (sound) {
      await sound.unloadAsync();
      setSound(null);
    }
  };

  // Use Effect
  useEffect(() => {
    if (assignedOrders) {
      // Check if any order should play sound
      const shouldPlaySound = assignedOrders?.some(
        (o: IOrder) => o?.isRiderRinged && !o?.isPickedUp
      );
      if (shouldPlaySound && !sound) {
        playSound();
      } else if (!shouldPlaySound && sound) {
        stopSound();
      }
    } else {
      stopSound();
    }

    return () => {
      if (sound) {
        stopSound();
      }
    };
  }, [assignedOrders, sound, logout]);

  return (
    <SoundContext.Provider value={{ playSound, stopSound }}>
      {children}
    </SoundContext.Provider>
  );
};
export const SoundContextConsumer = SoundContext.Consumer;
export const useSoundContext = () => useContext(SoundContext);
export default SoundContext;
