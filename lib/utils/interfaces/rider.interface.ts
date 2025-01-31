import { IRiderProfile } from "./user.interface";

export interface IRiderEarningsResponse {
  earnings: {
    data: {
      grandTotalEarnings: {
        riderTotal: number;
      };
      earnings: {
        riderEarnings: {
          deliveryFee: number;
          tip: number;
          totalEarnings: number;
        };
      };
    };
  };
}

export interface IRiderTransaction {
  status: string;
  amountTransferred: number;
  createdAt: string;
}

export interface IRiderTransactionHistoryResponse {
  transactionHistory: {
    data: IRiderTransaction[];
  };
}

export interface IRiderByIdResponse {
  rider: IRiderProfile;
}
