export interface IRiderEarningsArray {
  tip: number;
  orderDetails: {
    orderType: string;
    orderId: string;
    paymentMethod: string;
  };
  totalEarnings: number;
  deliveryFee: number;
  date: string;
}
export interface IRiderEarnings {
  _id: string;
  earningsArray: IRiderEarningsArray[];
  date: string;
  totalEarningsSum: number;
  totalTipsSum: number;
  totalDeliveries: number;
}
export interface IRiderEarningsResponse {
  riderEarningsGraph: {
    totalCount: number;
    earnings: IRiderEarnings[];
  };
}

export interface IRiderEarningsOrderProps {
  amount: number;
  orderId: string;
}
