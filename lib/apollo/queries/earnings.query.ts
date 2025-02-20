import { gql } from "@apollo/client";

export const STORE_EARNINGS_GRAPH = gql`
  query StoreEarningsGraph($storeId: ID!) {
    storeEarningsGraph(storeId: $storeId) {
      totalCount
      earnings {
        _id
        totalEarningsSum
        earningsArray {
          totalOrderAmount
          totalEarnings
          orderDetails {
            orderId
            orderType
            paymentMethod
          }
          date
        }
      }
    }
  }
`;

export const STORE_GRAND_TOTAL_EARNINGS = gql`
  query Earnings(
    $userType: UserTypeEnum
    $userId: String
    $orderType: OrderTypeEnum
    $paymentMethod: PaymentMethodEnum
    $pagination: PaginationInput
    $dateFilter: DateFilter
  ) {
    earnings(
      userType: $userType
      userId: $userId
      orderType: $orderType
      paymentMethod: $paymentMethod
      pagination: $pagination
      dateFilter: $dateFilter
    ) {
      data {
        earnings {
          grandTotalEarnings {
            storeTotal
          }
        }
        message
      }
    }
  }
`;
