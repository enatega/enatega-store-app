// Core
import { View } from 'react-native'

// Interfaces
import {
  IEarningDetailsMainProps,
  IRiderEarningsResponse,
} from '@/lib/utils/interfaces/rider-earnings.interface'

// Hooks
import { useUserContext } from '@/lib/context/global/user.context'
import { QueryResult, useQuery } from '@apollo/client'

// GraphQL
import { RIDER_EARNINGS_GRAPH } from '@/lib/apollo/queries/earnings.query'

// Components
import EarningDetailsHeader from '../header'
import EarningsDetailStacks from './earnings'

// Skeletons
import { EarningsSummaryMainLoading } from '@/lib/ui/skeletons'
import EarningDetailsDateFilter from '../date-filter'
import { showMessage } from 'react-native-flash-message'
import { useState } from 'react'

export default function EarningDetailsMain({
  dateFilter,
  setDateFilter,
}: IEarningDetailsMainProps) {
  // States
  const [isFiltering, setIsFiltering] = useState(false)
  const [isDateFilterVisible, setIsDateFilterVisible] = useState(false)

  // Contexts
  const { setModalVisible, userId } = useUserContext()

  // Queries
  const {
    loading: isRiderEarningsLoading,
    data: riderEarningsData,
    refetch: fetchRiderEarnings,
  } = useQuery(RIDER_EARNINGS_GRAPH, {
    onError: (err) => {
      console.error(err)
      showMessage({
        message:
          err.graphQLErrors[0].message ||
          err.networkError?.message ||
          'Failed to fetch earnings',
        type: 'danger',
        duration: 1000,
      })
    },
    variables: {
      riderId: userId ?? '',
    },
  }) as QueryResult<
    IRiderEarningsResponse | undefined,
    { riderId: string; startDate?: string; endDate?: string }
  >

  // Handlers
  async function handleDateFilterSubmit() {
    setIsFiltering(true)
    // Validation
    if (!dateFilter.startDate) {
      return showMessage({
        message: 'Please select a start date',
        type: 'danger',
        duration: 1000,
      })
    } else if (!dateFilter.endDate) {
      return showMessage({
        message: 'Please select an end date',
        type: 'danger',
        duration: 1000,
      })
    } else if (new Date(dateFilter.startDate) > new Date(dateFilter.endDate)) {
      return showMessage({
        message: 'Start date cannot be after end date',
        type: 'danger',
        duration: 1000,
      })
    }
    if (!userId) {
      return showMessage({
        message: 'Please log in to view your earnings',
        type: 'danger',
        duration: 1000,
      })
    }

    // Fetch with filters
    await fetchRiderEarnings({
      riderId: userId,
      startDate: dateFilter.startDate,
      endDate: dateFilter.endDate,
    })

    setIsFiltering(false)
    setIsDateFilterVisible(false)
  }
  console.log(isRiderEarningsLoading)
  // If loading
  if (isRiderEarningsLoading || isFiltering) return <EarningsSummaryMainLoading />
  return (
    <View>
      <EarningDetailsDateFilter
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        handleFilterSubmit={handleDateFilterSubmit}
        isFiltering={isRiderEarningsLoading || isFiltering}
        isDateFilterVisible={isDateFilterVisible}
        setIsDateFilterVisible={setIsDateFilterVisible}
        refetchDeafult={fetchRiderEarnings}
      />
      <EarningDetailsHeader />
      <EarningsDetailStacks
        isRiderEarningsLoading={isRiderEarningsLoading}
        riderEarningsData={riderEarningsData}
        setModalVisible={setModalVisible}
      />
    </View>
  )
}
