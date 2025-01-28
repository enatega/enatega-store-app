import { CustomContinueButton } from '@/lib/ui/useable-components'
import {Text, View } from 'react-native'
import RecentTransaction from '../recent-transactions'
import { useLazyQueryQL } from '@/lib/hooks/useLazyQueryQL'
import {
  RIDER_EARNINGS,
  RIDER_TRANSACTIONS_HISTORY,
} from '@/lib/apollo/queries'
import { useEffect, useState } from 'react'
import {
  IRiderEarningsResponse,
  IRiderTransactionHistoryResponse,
} from '@/lib/utils/interfaces/rider.interface'
import { ILazyQueryResult } from '@/lib/utils/interfaces'
import { ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { FlashMessageComponent } from '@/lib/ui/useable-components/flash-message'
import { ApolloError } from '@apollo/client'
import WithdrawModal from '../form'

export default function WalletMain() {
  // States
  const [isBottomModalOpen, setIsBottomModalOpen] = useState(false)
  const [amountErrMsg, setAmountErrMsg] = useState('')

  // Queries
  const {
    data: riderEarnings,
    fetch: fetchRiderEarnings,
    loading: isRiderEarningsLoading,
  } = useLazyQueryQL(RIDER_EARNINGS) as ILazyQueryResult<
    IRiderEarningsResponse | undefined,
    undefined
  >
  const {
    data: riderTransactionData,
    fetch: fetchRiderTransactions,
    loading: isRiderTransactionLoading,
  } = useLazyQueryQL(
    RIDER_TRANSACTIONS_HISTORY,
    {},
    {
      userType: 'RIDER',
      userId: '672dc04c4baeed21e25a7dd8',
    },
  ) as ILazyQueryResult<
    IRiderTransactionHistoryResponse | undefined,
    {
      userType: string
      userId: string
    }
  >
  // Handlers
  async function handleFormSubmission(withdrawAmount: number) {
    const currentAmount =
      riderEarnings?.earnings?.data?.grandTotalEarnings?.riderTotal || 0
    if (withdrawAmount > (currentAmount || 0)) {
      setAmountErrMsg(`Please enter a valid amount. You have ${currentAmount} available.`)
    } else if (withdrawAmount < 100) {
      setAmountErrMsg('The withdraw amount must be atleast 100 or greater.')
    }else if(typeof withdrawAmount !== 'number'){
      setAmountErrMsg('Please enter a valid number.')
    }
    try {
      console.log('sadx')
    } catch (error) {
      const err = error as ApolloError
      FlashMessageComponent({
        message:
          err.clientErrors[0].message ||
          err.graphQLErrors[0].message ||
          'Something went wrong',
      })
    }
  }
  // UseEffects
  useEffect(() => {
    fetchRiderEarnings()
    fetchRiderTransactions()
  }, [])

  return (
    <View className="flex flex-col gap-0  w-[100%] h-full">
      <View className="flex flex-column gap-4 items-center bg-[#F3F4F6] flex-2">
        <Text className="text-[18px] text-[#4B5563] font-[600] my-2">
          Current Balance
        </Text>
        <Text className="font-semibold text-[32px]">
          {isRiderEarningsLoading && 'Loading...'}$
          {riderEarnings?.earnings?.data?.grandTotalEarnings?.riderTotal ?? 0}
        </Text>
        <CustomContinueButton
          title="Withdraw Now"
          onPress={() => setIsBottomModalOpen((prev) => !prev)}
        />
      </View>
      <Text className="font-bold text-lg bg-white p-5 flex-2">
        Recent Transactions
      </Text>
      {isRiderTransactionLoading ?
        <Ionicons
          name="reload-sharp"
          color={'#c3e31e'}
          size={32}
          className="block animate-spin self-center"
        />
      : <ScrollView>
          {riderTransactionData?.transactionHistory.data.map(
            (transaction, index) => {
              return (
                <RecentTransaction
                  transaction={transaction}
                  key={transaction.createdAt}
                  isLast={
                    riderTransactionData?.transactionHistory.data.length - 1 ===
                    index
                  }
                />
              )
            },
          )}
        </ScrollView>
      }
      <WithdrawModal
        isBottomModalOpen={isBottomModalOpen}
        setIsBottomModalOpen={setIsBottomModalOpen}
        amountErrMsg={amountErrMsg}
        setAmountErrMsg={setAmountErrMsg}
        currentTotal={
          riderEarnings?.earnings?.data?.grandTotalEarnings?.riderTotal ?? 0
        }
        handleFormSubmission={handleFormSubmission}
      />
    </View>
  );
}
