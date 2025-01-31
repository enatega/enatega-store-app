import { Stack, usePathname } from 'expo-router'

export default function StackLayout() {
  const pathname = usePathname()
  return (
    <Stack
      screenOptions={{
        headerTitle:
          pathname.startsWith('/earnings/earnings-detail') ? 'Earnings Summary'
          : pathname.startsWith('/earnings/earnings-order-details') ?
            'Deliveries'
          : 'Earnings',
        headerBackTitle: 'Earnings',
        contentStyle:{
          backgroundColor:"white"
        }
      }}
    >
      <Stack.Screen
        name="/index"
        options={{ headerShown: true, headerTitle: 'Earnings Order Details' }}
      />
      <Stack.Screen
        name="/(routes)/earnings-order-details"
        options={{
          headerShown: true,
          headerTitle: 'Earnings Order Details',
          headerBackTitle: 'Hi there',
        }}
      />
      <Stack.Screen
        name="/(routes)/earnings-details"
        options={{ headerShown: true, headerTitle: 'Earning Details' }}
      />
    </Stack>
  )
}
