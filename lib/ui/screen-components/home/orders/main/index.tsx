import { IOrderTabsComponentProps } from '@/lib/utils/interfaces'
import { View, Text } from 'react-native'


export default function HomeOrdersMain(props: IOrderTabsComponentProps) {

    const { route } = props

    return (
        <View className='flex-1 bg-white'>
            <View className='p-5'>
                <Text>{route.title}</Text>
            </View>
        </View>
    )
}