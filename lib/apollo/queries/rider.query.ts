import { gql } from "@apollo/client"

export const RIDER_BY_ID = gql`
query Rider($id:String){
  rider(id:$id){
    _id
    location {coordinates}
    currentWalletAmount
    totalWalletAmount
    withdrawnWalletAmount
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

export const RIDER_PROFILE = gql`
  query Rider($id: String) {
    rider(id: $id) {
      _id
      name
      email
      accountNumber
      username
      available
      zone {
        _id
      }
      currentWalletAmount
      totalWalletAmount
      withdrawnWalletAmount
    }
  }
`;

export const rider = gql`
  query Rider($id: String) {
    rider(id: $id) {
      _id
      location {
        coordinates
      }
    }
  }
`;

export const RIDER_ORDERS = gql`
  query RiderOrders {
    riderOrders {
      _id
      orderId
      createdAt
      acceptedAt
      pickedAt
      assignedAt
      isPickedUp
      deliveredAt
      expectedTime
      deliveryCharges
      restaurant {
        _id
        name
        address
        location {
          coordinates
        }
      }
      deliveryAddress {
        location {
          coordinates
        }
        deliveryAddress
        label
        details
      }
      items {
        _id
        title
        food
        description
        quantity
        variation {
          _id
          title
          price
        }
        addons {
          _id
          options {
            _id
            title
            price
          }
          title
          description
          quantityMinimum
          quantityMaximum
        }
        isActive
        createdAt
      }
      user {
        _id
        name
        phone
      }
      paymentMethod
      paidAmount
      orderAmount
      paymentStatus
      orderStatus
      tipping
      taxationAmount
      reason
      isRiderRinged
      preparationTime
      rider {
        _id
        name
        username
      }
    }
  }
`;
