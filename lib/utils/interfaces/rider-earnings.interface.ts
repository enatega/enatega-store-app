import { ApolloQueryResult } from "@apollo/client";
import { Dispatch, SetStateAction } from "react";

export interface IStoreEarningsArray {
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
export interface IStoreEarnings {
  _id: string;
  earningsArray: IStoreEarningsArray[];
  date: string;
  totalEarningsSum: number;
  totalTipsSum: number;
  totalDeliveries: number;
}
export interface IStoreEarningsResponse {
  storeEarningsGraph: {
    totalCount: number;
    earnings: IStoreEarnings[];
  };
}

export interface IStoreEarningsOrderProps {
  amount: number;
  orderId: string;
}

export interface IDateFilter {
  startDate: string;
  endDate: string;
}

export interface IEarningDetailsMainProps {
  dateFilter: IDateFilter;
  setDateFilter: Dispatch<SetStateAction<IDateFilter>>;
}
export interface IEarningsDateFilterProps {
  handleFilterSubmit: () => Promise<void>;
  isFiltering: boolean;
  isDateFilterVisible: boolean;
  setIsDateFilterVisible: Dispatch<SetStateAction<boolean>>;
  refetchDeafult: (
    variables?:
      | Partial<{
          storeId: string;
          startDate?: string;
          endDate?: string;
        }>
      | undefined,
  ) => Promise<ApolloQueryResult<IStoreEarningsResponse | undefined>>;
}
