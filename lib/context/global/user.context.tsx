import React, { useContext, useEffect, useRef, useState } from 'react'
import {
    requestForegroundPermissionsAsync,
    watchPositionAsync,
    LocationAccuracy,
    LocationSubscription
} from 'expo-location'
import { useQuery } from '@apollo/client'
// Interface
import { IRidersOnCompletedResponsee, IUserProviderProps } from '@/lib/utils/interfaces'
// Context
import { useLocationContext } from './location.context'
// API
import { RIDER_ORDERS, RIDER_PROFILE } from '@/lib/apollo/queries'
import { UPDATE_LOCATION } from '@/lib/apollo/mutations/rider.mutation'
import { SUBSCRIPTION_ASSIGNED_RIDER, SUBSCRIPTION_ZONE_ORDERS } from '@/lib/apollo/subscriptions'
import AsyncStorage from '@react-native-async-storage/async-storage'





const UserContext = React.createContext({})

export const UserProvider = ({ children }: IUserProviderProps) => {
    const locationListener = useRef<LocationSubscription>()
    const [userId, setUserId] = useState('')
    const { locationPermission } = useLocationContext()

    const {
        loading: loadingProfile,
        error: errorProfile,
        data: dataProfile
    } = useQuery(RIDER_PROFILE, {
        fetchPolicy: 'network-only',
        // onCompleted,
        // pollInterval: 10000,
        // onError: error1
        variables:{
            id: userId
        }
    })
console.log({userId})
    const {
        client,
        loading: loadingAssigned,
        error: errorAssigned,
        data: dataAssigned,
        networkStatus: networkStatusAssigned,
        subscribeToMore,
        refetch: refetchAssigned
    } = useQuery(RIDER_ORDERS, {
        // onCompleted,
        // onError: error2,
        fetchPolicy: 'network-only',
        notifyOnNetworkStatusChange: true
        // pollInterval: 15000
    })

    let unsubscribeZoneOrder = null
    let unsubscribeAssignOrder = null


    // function onCompleted({ rider, assignedOrders }) {
    //     console.log({ rider, assignedOrders })

    //     console.log(rider)
    //     console.log(assignedOrders)
    //     console.log('onCompleted context')
    // }

    // function error1(error) {
    //     console.log('error on fetching context 1', JSON.stringify(error))
    // }
    // function error2(error) {
    //     console.log('error on fetching context 2', JSON.stringify(error))
    // }

    async function getUserId(){
      const id =  await AsyncStorage.getItem("rider-id")
      setUserId(id)
    }

    const subscribeNewOrders = () => {
        try {
            const unsubAssignOrder = subscribeToMore({
                document: SUBSCRIPTION_ASSIGNED_RIDER,
                variables: { riderId: dataProfile.rider._id },
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev
                    if (subscriptionData.data.subscriptionAssignRider.origin === 'new') {
                        return {
                            riderOrders: [
                                subscriptionData.data.subscriptionAssignRider.order,
                                ...prev.riderOrders
                            ]
                        }
                    } else if (
                        subscriptionData.data.subscriptionAssignRider.origin === 'remove'
                    ) {
                        return {
                            riderOrders: [
                                ...prev.riderOrders.filter(
                                    o =>
                                        o._id !==
                                        subscriptionData.data.subscriptionAssignRider.order._id
                                )
                            ]
                        }
                    }
                    return prev
                }
            })
            const unsubZoneOrder = subscribeToMore({
                document: SUBSCRIPTION_ZONE_ORDERS,
                variables: { zoneId: dataProfile.rider.zone._id },
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev

                    if (subscriptionData.data.subscriptionZoneOrders.origin === 'new') {
                        return {
                            riderOrders: [
                                subscriptionData.data.subscriptionZoneOrders.order,
                                ...prev.riderOrders
                            ]
                        }
                    }
                    return prev
                }
            })
            return { unsubZoneOrder, unsubAssignOrder }
        } catch (error) {
            console.log(error)
        }
    }

    // Use Effect
    useEffect(() => {
        if (!dataProfile) return
        {
            const { unsubZoneOrder, unsubAssignOrder } = subscribeNewOrders()
            unsubscribeZoneOrder = unsubZoneOrder
            unsubscribeAssignOrder = unsubAssignOrder
        }
        return () => {
            if (unsubscribeZoneOrder) {
                unsubscribeZoneOrder()
            }

            if (unsubscribeAssignOrder)
                unsubscribeAssignOrder()
        }

    }, [dataProfile])

    useEffect(() => {
        const trackRiderLocation = async () => {
            locationListener.current = await watchPositionAsync(
                { accuracy: LocationAccuracy.BestForNavigation, timeInterval: 10000 },
                async location => {
                    client.mutate({
                        mutation: UPDATE_LOCATION,
                        variables: {
                            latitude: location.coords.latitude.toString(),
                            longitude: location.coords.longitude.toString()
                        }
                    })
                }
            )
        }
        trackRiderLocation()
        return () => {
            if (locationListener.current) {
                locationListener.current.remove()
            }
        }
    }, [locationPermission])
    useEffect(() => {
        getUserId()
    },[])
    console.log({ dataAssigned })

    return (
        <UserContext.Provider
            value={{
                loadingProfile,
                errorProfile,
                dataProfile,
                userId,
                loadingAssigned,
                errorAssigned,
                assignedOrders:
                    loadingAssigned || errorAssigned ? [] : dataAssigned.riderOrders,
                refetchAssigned,
                networkStatusAssigned,
                requestForegroundPermissionsAsync
            }}>
            {children}
        </UserContext.Provider>
    )
}
export const UserConsumer = UserContext.Consumer
export const useUserContext = () => useContext(UserContext)
export default UserContext
