import { gql } from '@apollo/client'

export const RIDER_BY_ID = gql`
  query Rider($id: String) {
    rider(id: $id) {
      _id
      location {
        coordinates
      }
      zone {
        _id
      }
      currentWalletAmount
      totalWalletAmount
      withdrawnWalletAmount
    }
  }
`

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

export const RIDER_CURRENT_WITHDRAW_REQUEST = gql`
  query RiderCurrentWithdrawRequest($riderId: String) {
    riderCurrentWithdrawRequest(riderId: $riderId) {
      _id
      requestAmount
      status
      createdAt
    }
  }
`

export const STORE_PROFILE = gql`
  query Restaurant($id: String) {
    restaurant(id: $id) {
      _id
      orderId
      orderPrefix
      name
      image
      address
      location {
        coordinates
      }
      deliveryTime
      username
      isAvailable
      notificationToken
      enableNotification
      bussinessDetails {
        bankName
        accountNumber
        accountName
        accountCode
      }
      openingTimes {
        day
        times {
          startTime
          endTime
        }
      }
    }
  }
`

export const rider = gql`
  query Rider($id: String) {
    rider(id: $id) {
      _id
      location {
        coordinates
      }
    }
  }
`

export const STORE_ORDERS = gql`
query Orders{
    restaurantOrders{
      _id
      orderId
      id
      restaurant{
        _id
        
        name
        image
        address
        location{coordinates}
      }
      deliveryAddress{
        location{coordinates}
        deliveryAddress
        details
        label
      }
      items{
        _id
        id
        title
        description
        image
        quantity
        variation{
          _id
          id
          title
          price
          discounted
        }
        addons{
          _id
          id
          options{
            _id
            id
            title
            description
            price
          }
          description
          title
          quantityMinimum
          quantityMaximum
        }
        specialInstructions
        isActive
        createdAt
        updatedAt
      }
      user{
        _id
        name
        phone
        email
      }
      paymentMethod
      paidAmount
      orderAmount
      orderStatus
      tipping
      taxationAmount
      status
      paymentStatus
      reason
      isActive
      createdAt
      orderDate
      pickedAt
      deliveryCharges
      isPickedUp
      preparationTime
      acceptedAt
      isRinged
      instructions
      rider{
        _id
        name
        username
        available
      }
    }
}
`
