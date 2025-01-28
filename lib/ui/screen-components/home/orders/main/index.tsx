import { ConfigurationContext } from '@/lib/context/global/configuration.context'
import UserContext from '@/lib/context/global/user.context'
import Order from '@/lib/ui/useable-components/order'
import Spinner from '@/lib/ui/useable-components/spinner'
import { IOrderTabsComponentProps } from '@/lib/utils/interfaces'
import { IOrder } from '@/lib/utils/interfaces/order.interface'
import { NetworkStatus } from '@apollo/client'
import { useEffect, useState } from 'react'
import { useContext } from 'react'
import { View, Text, Dimensions, Platform } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

const { height } = Dimensions.get('window')

export default function HomeOrdersMain(props: IOrderTabsComponentProps) {
  // Props
  const { route } = props
  // // Context
  // const configuration = useContext(ConfigurationContext)
  const {
    loadingProfile,
    errorProfile,
    dataProfile,
    loadingAssigned,
    errorAssigned,
    assignedOrders,
    refetchAssigned,
    networkStatusAssigned,
  } = useContext(UserContext)
  const [orders, setOrders] = useState<IOrder[]>([])

  // Constants
  const noNewOrders = orders.length === 0

  // Handlers
  const onInitOrders = () => {
    if (loadingAssigned || errorAssigned) return
    if (assignedOrders.length === 0) return
    let _orders: IOrder[] = []
    switch (route.key) {
      case 'new_orders':
        _orders = assignedOrders.filter(
          (o: IOrder) =>
            o.orderStatus === 'ACCEPTED' && !o.rider && !o.isPickedUp,
        )
        break
      case 'processing':
        _orders = assignedOrders.filter(
          (o: IOrder) => o.orderStatus === 'ASSIGNED' && !o.isPickedUp,
        )

        break
      case 'delivered':
        _orders = assignedOrders.filter(
          (o: IOrder) =>
            ['PICKED', 'ACCEPTED', 'DELIVERED'].includes(o.orderStatus) &&
            o.rider &&
            dataProfile?.rider?._id === o?.rider?._id,
        )

        break
      default:
        alert('Default')
        break
    }

    setOrders(_orders)
  }

  // Use Effect
  useEffect(() => {
    onInitOrders()
  }, [assignedOrders, route.key])

  useEffect(() => {
    // Trigger refetch when orders length changes
    if (noNewOrders) {
      refetchAssigned()
    }
  }, [noNewOrders])

  // Calculate the marginBottom dynamically
  const marginBottom = Platform.OS === 'ios' ? height * 0.4 : height * 0.35

  // Render
  return (
    <View className="flex-1 bg-white">
      {loadingAssigned && (
        <View className="flex-1">
          <Spinner />
        </View>
      )}

      {errorAssigned ?
        <View className="flex-1 justify-center items-center">
          {' '}
          <Text className="text-2xl">Something went wrong</Text>
        </View>
      : <FlatList
          className={`h-[${height}px] mb-[${marginBottom}px]`}
          keyExtractor={(item) => item._id}
          data={orders}
          showsVerticalScrollIndicator={false}
          refreshing={networkStatusAssigned === NetworkStatus.loading}
          onRefresh={refetchAssigned}
          renderItem={({ item }: { item: IOrder }) => (
            <Order
              order={item}
              key={item._id}
              orderAmount={item?.orderAmount}
            />
          )}
        />
      }
    </View>
  )
}
