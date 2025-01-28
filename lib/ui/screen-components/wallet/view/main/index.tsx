import { CustomContinueButton } from '@/lib/ui/useable-components'
import { Text, View } from 'react-native'
import RecentTransaction from '../recent-transactions'
import { useLazyQueryQL } from '@/lib/hooks/useLazyQueryQL'
import {
  RIDER_BY_ID,
  RIDER_EARNINGS,
  RIDER_TRANSACTIONS_HISTORY,
} from '@/lib/apollo/queries'
import { useContext, useEffect, useState } from 'react'
import {
  IRiderByIdResponse,
  IRiderEarningsResponse,
  IRiderTransactionHistoryResponse,
} from '@/lib/utils/interfaces/rider.interface'
import { ILazyQueryResult } from '@/lib/utils/interfaces'
import { ScrollView } from 'react-native'
import { FlashMessageComponent } from '@/lib/ui/useable-components/flash-message'
import { ApolloError, useMutation } from '@apollo/client'
import WithdrawModal from '../form'
import SpinnerComponent from '@/lib/ui/useable-components/spinner'
import { CREATE_WITHDRAW_REQUEST } from '@/lib/apollo/mutations/withdraw-request.mutation'
import { AuthContext } from '@/lib/context/global/auth.context'
import UserContext, { useUserContext } from '@/lib/context/global/user.context'
import { GraphQLError } from 'graphql'
import { Alert } from 'react-native'

export default function WalletMain() {
  // States
  const [isBottomModalOpen, setIsBottomModalOpen] = useState(false)
  const [amountErrMsg, setAmountErrMsg] = useState('')

  const { logout } = useContext(AuthContext)
  const { userId } = useUserContext()

  // logout();
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
      userId: userId,
    },
  ) as ILazyQueryResult<
    IRiderTransactionHistoryResponse | undefined,
    {
      userType: string
      userId: string
    }
  >
  const {
    data: riderProfileData,
    fetch: fetchRiderProfile,
    loading: isRiderProfileLoading,
  } = useLazyQueryQL(
    RIDER_BY_ID,
    {},
    {
      id: userId,
    },
  ) as ILazyQueryResult<IRiderByIdResponse | undefined, { id: string }>

  // Mutaions
  const [
    createWithDrawRequest,
    { loading: createWithDrawRequestLoading, data: withdrawrequestData },
  ] = useMutation(CREATE_WITHDRAW_REQUEST, {
    onCompleted: () => {
      FlashMessageComponent({
        message: 'Successfully created the withdraw request!',
      })
    },
    onError: (error) => {
      Alert.alert('Warning', error.message)
      FlashMessageComponent({
        message:
          error.message ||
          error.graphQLErrors[0].message ||
          JSON.stringify(error) ||
          'Something went wrong',
      })
    },
  })

  // Handlers
  async function handleFormSubmission(withdrawAmount: number) {
    const currentAmount = riderProfileData?.rider.currentWalletAmount || 0
    if (withdrawAmount > (currentAmount || 0)) {
      setAmountErrMsg(
        `Please enter a valid amount. You have $${currentAmount} available.`,
      )
    } else if (withdrawAmount < 100) {
      setAmountErrMsg('The withdraw amount must be atleast 100 or greater.')
    } else if (typeof withdrawAmount !== 'number') {
      setAmountErrMsg('Please enter a valid number.')
    }
    try {
      await createWithDrawRequest({
        variables: {
          requestAmount: withdrawAmount,
        },
      })
    } catch (error) {
      const err = error as GraphQLError
      console.log(error)
      FlashMessageComponent({
        message: err.message || JSON.stringify(error) || 'Something went wrong',
      })
    }
  }
  console.log({ withdrawrequestData, createWithDrawRequestLoading })
  // UseEffects
  useEffect(() => {
    fetchRiderProfile()
    fetchRiderEarnings()
    fetchRiderTransactions()
  }, [])
  console.log('🚀 ~  riderProfileData:', riderProfileData)
  return (
    <View className="flex flex-col gap-0  w-[100%] h-full">
      {createWithDrawRequestLoading && <SpinnerComponent />}
      <View className="flex flex-column gap-4 items-center bg-[#F3F4F6]">
        <Text className="text-[18px] text-[#4B5563] font-[600] mt-12">
          Current Balance
        </Text>
        <Text className="font-semibold text-[32px]">
          {isRiderEarningsLoading && 'Loading...'}$
          {riderProfileData?.rider.currentWalletAmount ?? 0}
        </Text>
        <CustomContinueButton
          title="Withdraw Now"
          onPress={() => setIsBottomModalOpen((prev) => !prev)}
        />
      </View>
      <Text className="font-bold text-lg bg-white p-5 mt-4">
        Recent Transactions
      </Text>
      {isRiderTransactionLoading ?
        <SpinnerComponent />
      : <ScrollView style={{ backgroundColor: 'white' }}>
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
        currentTotal={riderProfileData?.rider?.currentWalletAmount ?? 0}
        handleFormSubmission={handleFormSubmission}
        withdrawRequestLoading={createWithDrawRequestLoading}
      />
    </View>
  )
}
