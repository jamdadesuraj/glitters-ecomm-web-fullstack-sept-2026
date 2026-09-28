import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState as IRootState } from '@/store'

export interface LoginRequest {
  email: string
  password: string
}

export interface UserData {
  _id: string
  name: string
  phone: string
  email: string
  role: string
  status: string
  packageFeatures: any[]
  menuBookmarks: any[]
  createdAt: string
  updatedAt: string
  __v: number
}

export interface LoginResponse {
  success: boolean
  statusCode: number
  message: string
  token: string
  data: UserData
}

export const apiSlice = createApi({
  reducerPath: 'api',

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,

    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as IRootState).auth?.token

      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }

      headers.set('Content-Type', 'application/json')

      return headers
    },
  }),

  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/signin',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
})

export const { useLoginMutation } = apiSlice
