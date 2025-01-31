import { Dispatch, SetStateAction } from 'react'
import { IRiderEarnings, IRiderEarningsArray } from './rider-earnings.interface'

export interface IEarningStackProps {
  earning: number
  date: string
  setModalVisible: Dispatch<SetStateAction<IRiderEarnings & { bool: boolean }>>
  tip: number
  _id: string
  earningsArray: IRiderEarningsArray[]
}
export interface IEarningBottomProps {
  totalEarnings: number
  totalDeliveries: number
  totalTips: number
  modalVisible: IRiderEarnings & { bool: boolean }
  setModalVisible: Dispatch<SetStateAction<IRiderEarnings & { bool: boolean }>>
}
