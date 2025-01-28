import { ReactNode } from 'react'
import { IGlobalComponentProps } from './global.interface'

export interface IOrder extends IGlobalComponentProps {
  _id: string
  orderId: string
  items: Array<{
    variation: {
      price: number
    }
    addons?: Array<{
      options: Array<{
        price: number
        title: string
      }>
    }>
    description: ReactNode
    title: string
    quantity: number
  }>
  paymentStatus: string
  createdAt: string
  deliveryAddress: {
    deliveryCharges: ReactNode
    deliveryAddress: string
  }
  orderAmount: number
  orderStatus: string
  preparationTime: string
  completionTime: string
}
