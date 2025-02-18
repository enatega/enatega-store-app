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
// Context

// API
import { STORE_ORDERS, STORE_PROFILE } from "@/lib/apollo/queries";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  IRiderEarnings,
  IRiderEarningsArray,
} from "@/lib/utils/interfaces/rider-earnings.interface";
import { asyncStorageEmitter } from "@/lib/services";

const UserContext = createContext<IUserContextProps>({} as IUserContextProps);

export const UserProvider = ({ children }: IUserProviderProps) => {
  // States
  const [modalVisible, setModalVisible] = useState<
    IRiderEarnings & { bool: boolean }
  >({
    bool: false,
    _id: "",
    date: "",
    earningsArray: [] as IRiderEarningsArray[],
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

  const {
    loading: loadingAssigned,
    error: errorAssigned,
    data: dataAssigned,
    networkStatus: networkStatusAssigned,
  } = useQuery(STORE_ORDERS, {
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });

  const getUserId = useCallback(async () => {
    const id = await AsyncStorage.getItem("store-id");
    if (id) {
      setUserId(id);
    }
  }, [userId]);

  useEffect(() => {
    const listener = asyncStorageEmitter.addListener("store-id", (data) => {
      setUserId(data?.value ?? "");
    });

    getUserId();

    return () => {
      if (listener) {
        listener.removeListener("store-id", () => {
          console.log("Rider Id listerener removed");
        });
      }
    };
  }, []);

  useEffect(() => {
    if (userId) {
      refetchProfile({ restaurantId: userId });
    }
  }, [userId]);

  /*Why is this duplicated? */
  // useEffect(() => {
  //   const trackRiderLocation = async () => {
  //     locationListener.current = await watchPositionAsync(
  //       { accuracy: LocationAccuracy.BestForNavigation, timeInterval: 10000 },
  //       async (location) => {
  //         client.mutate({
  //           mutation: UPDATE_LOCATION,
  //           variables: {
  //             latitude: location.coords.latitude.toString(),
  //             longitude: location.coords.longitude.toString(),
  //           },
  //         })
  //       },
  //     )
  //   }
  //   trackRiderLocation()
  //   return () => {
  //     if (locationListener.current) {
  //       locationListener.current.remove()
  //     }
  //   }
  // }, [])

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
