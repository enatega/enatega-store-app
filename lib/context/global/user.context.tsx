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
// import { useLocationContext } from "./location.context";
// API
import { STORE_ORDERS, STORE_PROFILE } from "@/lib/apollo/queries";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  IRiderEarnings,
  IRiderEarningsArray,
} from "@/lib/utils/interfaces/rider-earnings.interface";

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
  // const [riderOrderEarnings, setRiderOrderEarnings] = useState<
  //   IRiderEarningsArray[]
  // >([] as IRiderEarningsArray[]);
  const [userId, setUserId] = useState("");

  // Refs
  // const locationListener = useRef<LocationSubscription>();

  // Context
  // const { locationPermission } = useLocationContext()

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
  console.log("🚀 ~ UserProvider ~ loadingProfile:", { dataProfile });

  const {
    // client,
    loading: loadingAssigned,
    error: errorAssigned,
    data: dataAssigned,
    networkStatus: networkStatusAssigned,
    // subscribeToMore,
    // refetch: refetchAssigned,
  } = useQuery(STORE_ORDERS, {
    // onCompleted,
    // onError: error2,
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });

  // let unsubscribeZoneOrder: unknown = null;
  // let unsubscribeAssignOrder: unknown = null;

  const getUserId = useCallback(async () => {
    const id = await AsyncStorage.getItem("store-id");
    console.log("🚀 ~ getUserId ~ id:", { id });
    if (id) {
      setUserId(id);
    }
  }, [userId, refetchProfile]);

  // const subscribeNewOrders = () => {
  //   try {
  //     const unsubAssignOrder = subscribeToMore({
  //       document: SUBSCRIPTION_ASSIGNED_RIDER,
  //       variables: { riderId: dataProfile?.rider._id },
  //       updateQuery: (prev, { subscriptionData }) => {
  //         if (!subscriptionData.data) return prev;
  //         if (subscriptionData.data.subscriptionAssignRider.origin === "new") {
  //           return {
  //             riderOrders: [
  //               subscriptionData.data.subscriptionAssignRider.order,
  //               ...prev.riderOrders,
  //             ],
  //           };
  //         } else if (
  //           subscriptionData.data.subscriptionAssignRider.origin === "remove"
  //         ) {
  //           return {
  //             riderOrders: [
  //               ...prev.riderOrders.filter(
  //                 (o) =>
  //                   o._id !==
  //                   subscriptionData.data.subscriptionAssignRider.order._id,
  //               ),
  //             ],
  //           };
  //         }
  //         return prev;
  //       },
  //     });
  //     const unsubZoneOrder = subscribeToMore({
  //       document: SUBSCRIPTION_ZONE_ORDERS,
  //       variables: { zoneId: dataProfile?.rider?.zone?._id },
  //       updateQuery: (prev, { subscriptionData }) => {
  //         if (!subscriptionData.data) return prev;

  //         if (subscriptionData.data.subscriptionZoneOrders.origin === "new") {
  //           return {
  //             riderOrders: [
  //               subscriptionData.data.subscriptionZoneOrders.order,
  //               ...prev.riderOrders,
  //             ],
  //           };
  //         }
  //         return prev;
  //       },
  //     });
  //     return { unsubZoneOrder, unsubAssignOrder };
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // UseEffects
  // useEffect(() => {
  //   if (!dataProfile) return;
  //   {
  //     const { unsubZoneOrder, unsubAssignOrder } = subscribeNewOrders();
  //     unsubscribeZoneOrder = unsubZoneOrder;
  //     unsubscribeAssignOrder = unsubAssignOrder;
  //   }
  //   return () => {
  //     if (unsubscribeZoneOrder) {
  //       unsubscribeZoneOrder();
  //     }

  //     if (unsubscribeAssignOrder) unsubscribeAssignOrder();
  //   };
  // }, [dataProfile]);

  // const trackRiderLocation = async () => {
  //   locationListener.current = await watchPositionAsync(
  //     { accuracy: LocationAccuracy.BestForNavigation, timeInterval: 10000 },
  //     async (location) => {
  //       client.mutate({
  //         mutation: UPDATE_LOCATION,
  //         variables: {
  //           latitude: location.coords.latitude.toString(),
  //           longitude: location.coords.longitude.toString(),
  //         },
  //       });
  //     },
  //   );
  // };
  // useEffect(() => {
  //   trackRiderLocation();
  //   return () => {
  //     if (locationListener.current) {
  //       locationListener?.current?.remove();
  //     }
  //   };
  // }, []);

  useEffect(() => {
    getUserId();
  }, [getUserId]);

  console.log({ userId });
  useEffect(() => {
    if (userId) {
      refetchProfile({ restaurantId: userId });
    }
  }, [userId, refetchProfile]);
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
