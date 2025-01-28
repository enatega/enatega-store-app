import { ReactNode } from "react";
import { IGlobalComponentProps } from "./global.interface";
import { IRiderProfile } from "./user.interface";

export interface IOrderComponentProps extends IGlobalComponentProps {
  order: IOrder;
  orderAmount: number;
}

export interface IOrder {
  _id: string;
  orderId: string;
  paymentMethod?: string;
  items: Array<{
    variation: {
      price: number;
    };
    addons?: Array<{
      options: Array<{
        price: number;
        title: string;
      }>;
    }>;
    description: ReactNode;
    title: string;
    quantity: number;
  }>;
  paymentStatus: string;
  createdAt: string;
  acceptedAt: string;
  deliveryAddress: {
    deliveryCharges: ReactNode;
    deliveryAddress: string;
  };
  orderAmount: number;
  orderStatus: string;
  preparationTime: string;
  completionTime: string;
  isPickedUp: boolean;
  rider: IRiderProfile;
}
