/* eslint-disable @typescript-eslint/no-empty-object-type */
import { ReactNode } from "react";
import { IGlobalProps } from "./global.interface";

export interface IConfigurationContextProps extends IGlobalProps {}

export interface IConfiguration {
  _id: string;
  googleApiKey: string;
  riderAppSentryUrl: string;
  currency: string;
  currencySymbol: string;
}

export interface IConfigurationProviderProps {
  children: ReactNode;
}
