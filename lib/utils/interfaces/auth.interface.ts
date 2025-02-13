/* eslint-disable @typescript-eslint/no-empty-object-type */
import { NormalizedCacheObject } from '@apollo/client'
import { ApolloClient } from '@apollo/client'
import { IGlobalProviderProps } from './global.interface'

export interface ILoginInitialValues {
  username: string
  password: string
}

export interface IAuthContext {
  token: string
  setTokenAsync: (token: string) => Promise<void>
  logout: () => void
}

export interface IAuthProviderProps extends IGlobalProviderProps {
  client: ApolloClient<NormalizedCacheObject>
}

interface IStoreLoginResponse {
  token: string
  restaurantId: string
}

interface IStoreDefaultCredsResponse {
  restaurantUsername: string
  restaurantPassword: string
}

export interface IStoreLoginCompleteResponse {
  restaurantLogin: IStoreLoginResponse
  lastOrderCreds: IStoreDefaultCredsResponse
}
