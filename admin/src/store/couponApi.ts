import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '@/store'

export interface ICoupon {
  _id: string
  couponName: string
  status: 'active' | 'inactive'
  isDeleted: boolean
  createdAt: string
  updatedAt: string
}

interface CouponResponse {
  success: boolean
  statusCode: number
  message: string
  data: ICoupon | ICoupon[]
}

export const couponApi = createApi({
  reducerPath: 'couponApi',

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,

    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState)?.auth?.token

      console.log('TOKEN =>', token)

      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      headers.set('Content-Type', 'application/json')

      return headers
    },
  }),

  tagTypes: ['Coupon'],

  endpoints: (builder) => ({
    getCoupon: builder.query<ICoupon[], void>({
      query: () => ({
        url: '/coupons',
        method: 'GET',
      }),

      transformResponse: (response: CouponResponse): ICoupon[] => {
        return Array.isArray(response.data) ? response.data : [response.data]
      },

      providesTags: ['Coupon'],
    }),

    // single
    getCouponById: builder.query<ICoupon, string>({
      query: (id) => `/coupons/${id}`,
      transformResponse: (response: CouponResponse) => response.data as ICoupon,
      providesTags: (result, error, id) => [{ type: 'Coupon', id }],
    }),

    // create team api
    createCoupon: builder.mutation<ICoupon, FormData>({
      query: (formData) => ({
        url: '/coupons',
        method: 'POST',
        body: formData,
      }),

      transformResponse: (response: CouponResponse) => response.data as ICoupon,

      invalidatesTags: ['Coupon'],
    }),

    // update team api
    updateCoupon: builder.mutation<ICoupon, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/coupons/${id}`,
        method: 'PUT',
        body: data,
      }),
      transformResponse: (response: CouponResponse) => response.data as ICoupon,
      invalidatesTags: ['Coupon'],
    }),

    // delete team api
    deleteCoupon: builder.mutation<ICoupon, string>({
      query: (id) => ({
        url: `/coupons/${id}`,
        method: 'DELETE',
      }),

      transformResponse: (response: CouponResponse) => response.data as ICoupon,

      invalidatesTags: ['Coupon'],
    }),
  }),
})

export const { useGetCouponQuery, useGetCouponByIdQuery, useCreateCouponMutation, useUpdateCouponMutation, useDeleteCouponMutation } = couponApi
