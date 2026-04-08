import { api } from './api'

export interface LoginRequest {
  username: string
  password: string
}

export interface User {
  id: number
  name: string
  email: string
}

export interface LoginResponse {
  token: string
  user: User
}

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
})

export const { useLoginMutation } = authApi
