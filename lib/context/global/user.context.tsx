import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { requestForegroundPermissionsAsync } from "expo-location";
import { QueryResult, useQuery } from "@apollo/client";

// Interface
import {
  IStoreProfileResponse,
  IUserContextProps,
  IUserProviderProps,
} from "@/lib/utils/interfaces";

// API
import { STORE_ORDERS, STORE_PROFILE } from "@/lib/apollo/queries";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  IStoreEarnings,
  IStoreEarningsArray,
} from "@/lib/utils/interfaces/rider-earnings.interface";

const UserContext = createContext<IUserContextProps>({} as IUserContextProps);

export const UserProvider = ({ children }: IUserProviderProps) => {
  // States
  const [modalVisible, setModalVisible] = useState<
    IStoreEarnings & { bool: boolean }
  >({
    bool: false,
    _id: "",
    date: "",
    earningsArray: [] as IStoreEarningsArray[],
    totalEarningsSum: 0,
    totalTipsSum: 0,
    totalDeliveries: 0,
  });
  const [userId, setUserId] = useState("");

  const {
    loading: loadingProfile,
    error: errorProfile,
    data: dataProfile,
    refetch: refetchProfile,
  } = useQuery(STORE_PROFILE, {
    fetchPolicy: "network-only",
    variables: {
      restaurantId: userId,
    },
  }) as QueryResult<
    IStoreProfileResponse | undefined,
    { restaurantId: string }
  >;
  console.log("🚀 ~ UserProvider ~ userId:", userId);
  console.log("🚀 ~ UserProvider ~ loadingProfile:", {
    dataProfile: dataProfile?.restaurant,
  });

  const {
    loading: loadingAssigned,
    error: errorAssigned,
    data: dataAssigned,
    networkStatus: networkStatusAssigned,
  } = useQuery(STORE_ORDERS, {
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });
  async function fetchProfile() {
    try {
      if (userId) {
        console.log("🚀 ~ fetchProfile ~ userId:", userId);
        await refetchProfile({ restaurantId: userId });
      }
    } catch (error) {
      console.error("profile fetch error", error);
    }
  }
  const getUserId = useCallback(async () => {
    const id = await AsyncStorage.getItem("store-id");
    if (id) {
      setUserId(id);
    }
  }, [userId]);

  useEffect(() => {
    getUserId();
  }, [userId]);

  useEffect(() => {
    fetchProfile();
  }, [userId, refetchProfile]);

  return (
    <UserContext.Provider
      value={{
        modalVisible,
        // riderOrderEarnings,
        setModalVisible,
        // setRiderOrderEarnings,
        userId,
        loadingProfile,
        errorProfile,
        dataProfile: dataProfile?.restaurant ?? null,
        loadingAssigned,
        errorAssigned,
        assignedOrders:
          loadingAssigned || errorAssigned ? [] : dataAssigned.restaurantOrders,
        // refetchAssigned,
        networkStatusAssigned,
        requestForegroundPermissionsAsync,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export const UserConsumer = UserContext.Consumer;
export const useUserContext = () => useContext(UserContext);
export default UserContext;
