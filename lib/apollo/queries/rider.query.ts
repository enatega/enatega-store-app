import { gql } from "@apollo/client"

export const RIDER_BY_ID = gql`
query Rider($id:String){
  rider(id:$id){
    _id
    location {coordinates}
  }
}`

export const RIDER_EARNINGS = gql`
query RiderEarnings {
  earnings {
    data {
      grandTotalEarnings {
        riderTotal
      }
      earnings {
        riderEarnings {
          deliveryFee
          tip
          totalEarnings
          
        }
        
      }
    }
  }
}
`

export const RIDER_TRANSACTIONS_HISTORY = gql`
query TransactionHistory($userType: UserTypeEnum, $userId: String) {
  transactionHistory(userType: $userType, userId: $userId) {
    data {
      status
      amountTransferred
      createdAt
    }
  }
}
`