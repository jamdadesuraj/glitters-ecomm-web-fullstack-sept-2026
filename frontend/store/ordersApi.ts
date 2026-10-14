import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { auth } from "@/firebase/config";
import { addToCartApi } from "./addToCartApi";

/* =========================================================
   Types
========================================================= */

export type PaymentMethod =
  | "card"
  | "upi"
  | "razorpay"
  | "tabby"
  | "cod"
  | "apple-pay";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "cancelled";

export type PaymentStatus = "pending" | "paid" | "failed";

export interface IOrderItem {
  _id: string;
  product: string;
  variantId: string;
  productName: string;
  brand: string;
  material: string;
  color: string;
  size: string;
  image: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
}

export interface IShippingAddress {
  name: string;
  type?: string;
  phone: string;
  address: string;
  city?: string;
  state?: string;
  pincode?: string;
}

export interface IOrder {
  _id: string;
  orderNumber: string;
  items: IOrderItem[];
  shippingAddress: IShippingAddress;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  subtotal: number;
  shipping: number;
  total: number;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateOrderBody {
  shippingAddress: IShippingAddress;
  paymentMethod: PaymentMethod;
}

interface IOrderResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

/* =========================================================
   Base Query (adds Firebase token)
========================================================= */

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,

  prepareHeaders: async (headers) => {
    try {
      await auth.authStateReady();

      const user = auth.currentUser;

      if (user) {
        const token = await user.getIdToken();
        headers.set("Authorization", `Bearer ${token}`);
      }
    } catch (error) {
      console.error("Firebase token error:", error);
    }

    return headers;
  },
});

/* =========================================================
   Orders API
========================================================= */

export const ordersApi = createApi({
  reducerPath: "ordersApi",

  baseQuery,

  tagTypes: ["Orders"],

  endpoints: (builder) => ({
    // PLACE ORDER (uses the current cart)
    createOrder: builder.mutation<IOrderResponse<IOrder>, ICreateOrderBody>({
      query: (body) => ({
        url: "/orders",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Orders"],

      // the backend empties the cart, so refresh the cart data too
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(addToCartApi.util.invalidateTags(["AddToCart"]));
        } catch {
          /* order failed - cart stays as it is */
        }
      },
    }),

    // MY ORDERS
    getMyOrders: builder.query<IOrder[], void>({
      query: () => "/orders",
      transformResponse: (response: IOrderResponse<IOrder[]>) => response.data,
      providesTags: ["Orders"],
    }),

    // ONE ORDER
    getOrderById: builder.query<IOrder, string>({
      query: (id) => `/orders/${id}`,
      transformResponse: (response: IOrderResponse<IOrder>) => response.data,
      providesTags: ["Orders"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetMyOrdersQuery,
  useGetOrderByIdQuery,
} = ordersApi;
