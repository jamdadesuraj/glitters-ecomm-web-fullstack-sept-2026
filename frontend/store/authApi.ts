import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { auth } from "@/firebase/config";

export interface AuthUser {
  _id: string;
  firebaseUid: string;
  name: string;
  email: string;
  phone: string;
  profileImage: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: AuthUser;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

export const authApi = createApi({
  reducerPath: "authApi",

  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,

    prepareHeaders: async (headers) => {
      try {
        // Wait for Firebase to restore authentication
        // after page refresh.
        await auth.authStateReady();

        const currentUser = auth.currentUser;

        if (currentUser) {
          const token = await currentUser.getIdToken();

          headers.set("Authorization", `Bearer ${token}`);
        }
      } catch (error) {
        console.error("Firebase authentication token error:", error);
      }

      headers.set("Content-Type", "application/json");

      return headers;
    },
  }),

  tagTypes: ["AuthUser"],

  endpoints: (builder) => ({
    /**
     * Create/update Firebase user in MongoDB
     */
    syncUser: builder.mutation<AuthResponse, void>({
      query: () => ({
        url: "/api/auth/sync",
        method: "POST",
      }),

      invalidatesTags: ["AuthUser"],
    }),

    /**
     * Get currently logged-in MongoDB user
     */
    getMe: builder.query<AuthResponse, void>({
      query: () => ({
        url: "/api/auth/me",
        method: "GET",
      }),

      providesTags: ["AuthUser"],
    }),
  }),
});

export const { useSyncUserMutation, useGetMeQuery, useLazyGetMeQuery } =
  authApi;
