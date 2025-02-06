// Components
import { UPDATE_BUSINESS_DETAILS } from '@/lib/apollo/mutations/rider.mutation'
import { RIDER_PROFILE } from '@/lib/apollo/queries'
import { useUserContext } from '@/lib/context/global/user.context'
import { CustomContinueButton } from '@/lib/ui/useable-components'

// Hooks
import { useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'

// Core
import {
  TouchableWithoutFeedback,
  Text,
  TextInput,
  View,
  Keyboard,
} from 'react-native'
import { showMessage } from 'react-native-flash-message'

export default function BankManagementMain() {
  // Contexts
  const { userId, dataProfile } = useUserContext()
  console.log('🚀 ~ BankManagementMain ~ dataProfile:', {
    bussinessDetails: dataProfile?.bussinessDetails,
  })

  // states
  const [isError, setIsError] = useState({
    field: '',
    message: '',
  })
  const [formData, setFormData] = useState({
    bankName: '',
    accountName: '',
    accountNumber: '',
  })

  // Mutations
  const [mutateBankDetails, { loading: areBankDetailsLoading }] = useMutation(
    UPDATE_BUSINESS_DETAILS,
    {
      onError: (error) => {
        showMessage({
          message: 'Failed to update bank details',
          type: 'danger',
        })
        console.error('Failed to update bank details', error)
      },
      onCompleted: () => {
        setFormData({
          bankName: '',
          accountName: '',
          accountNumber: '',
        })
        showMessage({
          message: 'Bank details updated successfully',
          type: 'success',
        })
        setIsError({
          field: '',
          message: '',
        })
      },
      refetchQueries: [{ query: RIDER_PROFILE, variables: { id: userId } }],
    },
  )

  // Handlers
  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }
  const handleSubmit = async () => {
    console.warn({ formData })
    try {
      if (!formData.bankName) {
        setIsError({
          field: 'bankName',
          message: 'Bank Name is required',
        })
        return showMessage({
          message: 'Bank Name is required',
          type: 'danger',
        })
      } else if (!formData.accountName) {
        setIsError({
          field: 'accountName',
          message: 'Account Name is required',
        })
        return showMessage({
          message: 'Account Name is required',
          type: 'danger',
        })
      } else if (!formData.accountNumber) {
        setIsError({
          field: 'accountNumber',
          message: 'Account Number is required',
        })
        return showMessage({
          message: 'Account Number is required',
          type: 'danger',
        })
      }
      await mutateBankDetails({
        variables: {
          updateRiderBussinessDetailsId: userId,
          bussinessDetails: {
            bankName: formData.bankName,
            accountName: formData.accountName,
            accountNumber: Number(formData.accountNumber),
          },
        },
      })
    } catch (error) {
      console.log(error)
    }
  }

  // UseEffect
  useEffect(() => {
    if (
      !areBankDetailsLoading &&
      dataProfile?.bussinessDetails &&
      Object.values(dataProfile?.bussinessDetails).length > 0
    ) {
      setFormData({
        bankName: dataProfile?.bussinessDetails.bankName ?? '',
        accountName: dataProfile?.bussinessDetails.accountName ?? '',
        accountNumber: String(
          dataProfile?.bussinessDetails.accountNumber ?? '',
        ),
      })
    }
  }, [dataProfile?.bussinessDetails, areBankDetailsLoading])
  return (
    <View className="flex flex-col justify-between items-center w-full h-[65%] my-4 px-4">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <View className="flex flex-col w-full items-start justify-start">
            <Text className="text-xl font-normal">Bank Name</Text>
            <TextInput
              className={`min-w-[100%] rounded-md border ${isError.field === 'bankName' ? 'border-red-600 border-2' : 'border-2 border-gray-300'} p-3 my-2`}
              value={formData.bankName}
              placeholder="Swiss Bank"
              onChangeText={(val) => {
                setIsError({ field: '', message: '' })
                handleChange('bankName', val)
              }}
            />
          </View>
          <View className="flex flex-col w-full items-start justify-start">
            <Text className="text-xl font-normal">
              Full Name of the Bank Account Holder
            </Text>
            <TextInput
              className={`min-w-[100%] rounded-md border ${isError.field === 'accountName' ? 'border-red-600 border-2' : 'border-2 border-gray-300'} p-3 my-2`}
              value={formData.accountName}
              placeholder="Micheal Kim"
              onChangeText={(val) => {
                setIsError({ field: '', message: '' })
                handleChange('accountName', val)
              }}
            />
          </View>
          <View className="flex flex-col w-full items-start justify-start">
            <Text className="text-xl font-normal">IBAN</Text>
            <TextInput
              className={`min-w-[100%] rounded-md border ${isError.field === 'accountNumber' ? 'border-red-600 border-2' : 'border-2 border-gray-300'} p-3 my-2`}
              value={formData.accountNumber}
              placeholder="PK33SWB 7838246824682346"
              onChangeText={(val) => {
                setIsError({ field: '', message: '' })
                handleChange('accountNumber', val)
              }}
            />
          </View>
          <View>
            <CustomContinueButton
              title={areBankDetailsLoading ? 'Please wait...' : 'Confirm'}
              onPress={handleSubmit}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}
