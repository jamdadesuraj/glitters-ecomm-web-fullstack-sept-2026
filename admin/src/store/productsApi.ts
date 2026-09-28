import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '@/store'

export interface IProductBasicInfo {
  title: string
  productImages: string[]
  video: string
  description: string
}

export interface IProductOverview {
  title: string
  subTitle: string
  description: string
}

export interface IProductTesting {
  title: string
  subTitle: string
  shortDescription: string
  testingParameters: string[]
}

export interface IProductFeatures {
  icon: string
  title: string
  subTitle: string
}

export interface IProductAiFeatures {
  title: string
  subTitle: string
  shortDescription: string
  features: IProductFeatures[]
}

export interface IProductSystem {
  title: string
  subTitle: string
  img: string
}

export interface IProductTechnicalInfo {
  title: string
  subTitle: string
  flightTime: string
  range: string
  speed: string
  weight: string
  battery: string
  camera: string
}

export interface IProducts {
  _id: string
  basicInfo: IProductBasicInfo
  technicalInfo: IProductTechnicalInfo
  productOverview: IProductOverview
  productTesting: IProductTesting
  aiFeatures: IProductAiFeatures
  system: IProductSystem
  isDeleted: boolean
  createdAt: string
  updatedAt: string
}

interface ProductsResponse {
  success: boolean
  statusCode: number
  message: string
  data: IProducts | IProducts[]
}

export const productsApi = createApi({
  reducerPath: 'productsApi',

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,

    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState)?.auth?.token

      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      // ❌ DON'T SET CONTENT-TYPE HERE
      // Browser automatically handles multipart/form-data

      return headers
    },
  }),

  tagTypes: ['Products'],

  endpoints: (builder) => ({
    // ==========================
    // GET ALL PRODUCTS
    // ==========================
    getProducts: builder.query<IProducts[], void>({
      query: () => ({
        url: '/products',
        method: 'GET',
      }),

      transformResponse: (response: ProductsResponse): IProducts[] => {
        return Array.isArray(response.data) ? response.data : [response.data]
      },

      providesTags: (result) =>
        result
          ? [
              ...result.map((product) => ({
                type: 'Products' as const,
                id: product._id,
              })),
              { type: 'Products', id: 'LIST' },
            ]
          : [{ type: 'Products', id: 'LIST' }],
    }),

    // ==========================
    // GET SINGLE PRODUCT
    // ==========================
    getProductsById: builder.query<IProducts, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'GET',
      }),

      transformResponse: (response: ProductsResponse) => response.data as IProducts,

      providesTags: (result, error, id) => [
        {
          type: 'Products',
          id,
        },
      ],
    }),

    // ==========================
    // CREATE PRODUCT
    // ==========================
    createProducts: builder.mutation<IProducts, FormData>({
      query: (formData) => ({
        url: '/products',
        method: 'POST',
        body: formData,
      }),

      transformResponse: (response: ProductsResponse) => response.data as IProducts,

      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),

    // ==========================
    // UPDATE PRODUCT
    // ==========================
    updateProducts: builder.mutation<
      IProducts,
      {
        id: string
        data: FormData
      }
    >({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: 'PUT',
        body: data,
      }),

      transformResponse: (response: ProductsResponse) => response.data as IProducts,

      invalidatesTags: (result, error, { id }) => [
        { type: 'Products', id },
        { type: 'Products', id: 'LIST' },
      ],
    }),

    // ==========================
    // DELETE PRODUCT
    // ==========================
    deleteProducts: builder.mutation<IProducts, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),

      transformResponse: (response: ProductsResponse) => response.data as IProducts,

      invalidatesTags: (result, error, id) => [
        { type: 'Products', id },
        { type: 'Products', id: 'LIST' },
      ],
    }),
  }),
})

export const { useGetProductsQuery, useGetProductsByIdQuery, useCreateProductsMutation, useUpdateProductsMutation, useDeleteProductsMutation } =
  productsApi
