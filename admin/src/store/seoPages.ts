import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '@/store'

export interface ISEOPages {
  _id: string
  aboutTitle: string
  aboutSubTitle: string
  aboutBgImage: string
  servicesTitle: string
  servicesSubTitle: string
  servicesBgImage: string
  servicesDetailsTitle: string
  servicesDetailsSubTitle: string
  servicesDetailsBgImage: string
  productTitle: string
  productSubTitle: string
  productBgImage: string
  productDetailsTitle: string
  productDetailsSubTitle: string
  productDetailsBgImage: string
  newsTitle: string
  newsSubTitle: string
  newsBgImage: string
  newsDetailsTitle: string
  newsDetailsSubTitle: string
  newsDetailsBgImage: string
  careerTitle: string
  careerSubTitle: string
  careerBgImage: string
  contactTitle: string
  contactSubTitle: string
  contactBgImage: string
  awardTitle: string
  awardSubTitle: string
  awardBgImage: string
  ourPartnerTitle: string
  ourPartnerSubTitle: string
  ourPartnerBgImage: string
  mediaCoverageTitle: string
  mediaCoverageSubTitle: string
  mediaCoverageBgImage: string
  galleryTitle: string
  gallerySubTitle: string
  galleryBgImage: string
  faqTitle: string
  faqSubTitle: string
  faqBgImage: string
  privacyTitle: string
  privacySubTitle: string
  privacyBgImage: string
  termsTitle: string
  termsSubTitle: string
  termsBgImage: string
  isDeleted: boolean
  createdAt: string
  updatedAt: string
}

interface SEOPagesResponse {
  success: boolean
  statusCode: number
  message: string
  data: ISEOPages | ISEOPages[]
}

export const seoPagesApi = createApi({
  reducerPath: 'seoPagesApi',

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

  tagTypes: ['SEOPages'],

  endpoints: (builder) => ({
    getSEOPages: builder.query<ISEOPages[], void>({
      query: () => ({
        url: '/seo-pages',
        method: 'GET',
      }),

      transformResponse: (response: SEOPagesResponse): ISEOPages[] => {
        return Array.isArray(response.data) ? response.data : [response.data]
      },

      providesTags: ['SEOPages'],
    }),

    // single
    getSEOPagesById: builder.query<ISEOPages, string>({
      query: (id) => `/seo-pages/${id}`,
      transformResponse: (response: SEOPagesResponse) => response.data as ISEOPages,
      providesTags: (result, error, id) => [{ type: 'SEOPages', id }],
    }),

    // create team api
    createSEOPages: builder.mutation<ISEOPages, FormData>({
      query: (formData) => ({
        url: '/seo-pages',
        method: 'POST',
        body: formData,
      }),

      transformResponse: (response: SEOPagesResponse) => response.data as ISEOPages,

      invalidatesTags: ['SEOPages'],
    }),

    // update team api
    updateSEOPages: builder.mutation<ISEOPages, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/seo-pages/${id}`,
        method: 'PUT',
        body: data,
      }),
      transformResponse: (response: SEOPagesResponse) => response.data as ISEOPages,
      invalidatesTags: ['SEOPages'],
    }),

    // delete team api
    deleteSEOPages: builder.mutation<ISEOPages, string>({
      query: (id) => ({
        url: `/seo-pages/${id}`,
        method: 'DELETE',
      }),

      transformResponse: (response: SEOPagesResponse) => response.data as ISEOPages,

      invalidatesTags: ['SEOPages'],
    }),
  }),
})

export const { useGetSEOPagesQuery, useGetSEOPagesByIdQuery, useCreateSEOPagesMutation, useUpdateSEOPagesMutation, useDeleteSEOPagesMutation } =
  seoPagesApi
