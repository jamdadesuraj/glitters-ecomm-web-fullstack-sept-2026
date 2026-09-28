import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '@/store'

export interface IContact {
  _id: string
  fullName: string
  emailAddress: string
  subject: string
  phone: string
  message: string
  isDeleted: boolean
  createdAt: string
  updatedAt: string
}

interface ContactResponse {
  success: boolean
  statusCode: number
  message: string
  data: IContact | IContact[]
}

export const contactApi = createApi({
  reducerPath: 'contactApi',

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

  tagTypes: ['Contact'],

  endpoints: (builder) => ({
    getContact: builder.query<IContact[], void>({
      query: () => ({
        url: '/enquiries-contacts',
        method: 'GET',
      }),

      transformResponse: (response: ContactResponse): IContact[] => {
        return Array.isArray(response.data) ? response.data : [response.data]
      },

      providesTags: ['Contact'],
    }),

    // single
    getContactById: builder.query<IContact, string>({
      query: (id) => `/enquiries-contacts/${id}`,
      transformResponse: (response: ContactResponse) => response.data as IContact,
      providesTags: (result, error, id) => [{ type: 'Contact', id }],
    }),

    // create team api
    createContact: builder.mutation<IContact, FormData>({
      query: (formData) => ({
        url: '/enquiries-contacts',
        method: 'POST',
        body: formData,
      }),

      transformResponse: (response: ContactResponse) => response.data as IContact,

      invalidatesTags: ['Contact'],
    }),

    // update team api
    updateContact: builder.mutation<IContact, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/enquiries-contacts/${id}`,
        method: 'PUT',
        body: data,
      }),
      transformResponse: (response: ContactResponse) => response.data as IContact,
      invalidatesTags: ['Contact'],
    }),

    // delete team api
    deleteContact: builder.mutation<IContact, string>({
      query: (id) => ({
        url: `/enquiries-contacts/${id}`,
        method: 'DELETE',
      }),

      transformResponse: (response: ContactResponse) => response.data as IContact,

      invalidatesTags: ['Contact'],
    }),
  }),
})

export const { useGetContactQuery, useGetContactByIdQuery, useCreateContactMutation, useUpdateContactMutation, useDeleteContactMutation } = contactApi
