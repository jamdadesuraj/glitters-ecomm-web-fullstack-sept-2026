import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import { apiSlice } from './apiSlice'
import { settingApi } from './settingApi'
import { homeBannerApi } from './homeBanner'
import { aboutUsApi } from './aboutUsApi'
import { counterApi } from './counterApi'

import { currentOpeningsApi } from './currentOpeningsApi'

import { testimonialsApi } from './testimonialsApi'
import { faqApi } from './faqApi'

import { mediaCoverageApi } from './mediaCoverageApi'
import { privacyApi } from './privacyPolicyApi'
import { contactApi } from './contactApi'
import { careerApi } from './careerEnquiriesApi'
import { blogApi } from './blogApi'

import { termsApi } from './termsApi'
import { productsApi } from './productsApi'

import { seoPagesApi } from './seoPages'
import { categoryApi } from './categoriesApi'
import { subCategoryApi } from './subCategoryApi'
import { offerBannerApi } from './offerBannerApi'
import { topSaleBannerApi } from './topSaleBannerApi'
import { careerInfoApi } from './careerinfoApi'
import { returnRefundApi } from './returnRefundApi'
import { returnRequestApi } from './returnRequestApi'
import { blogCategoryApi } from './blogCategoryApi'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [subCategoryApi.reducerPath]: subCategoryApi.reducer,
    [offerBannerApi.reducerPath]: offerBannerApi.reducer,
    [topSaleBannerApi.reducerPath]: topSaleBannerApi.reducer,
    [homeBannerApi.reducerPath]: homeBannerApi.reducer,
    [aboutUsApi.reducerPath]: aboutUsApi.reducer,
    [counterApi.reducerPath]: counterApi.reducer,

    [careerInfoApi.reducerPath]: careerInfoApi.reducer,
    [currentOpeningsApi.reducerPath]: currentOpeningsApi.reducer,

    [testimonialsApi.reducerPath]: testimonialsApi.reducer,
    [faqApi.reducerPath]: faqApi.reducer,

    [mediaCoverageApi.reducerPath]: mediaCoverageApi.reducer,
    [privacyApi.reducerPath]: privacyApi.reducer,
    [returnRefundApi.reducerPath]: returnRefundApi.reducer,
    [returnRequestApi.reducerPath]: returnRequestApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
    [careerApi.reducerPath]: careerApi.reducer,

    [blogCategoryApi.reducerPath]: blogCategoryApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,

    [termsApi.reducerPath]: termsApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,

    [seoPagesApi.reducerPath]: seoPagesApi.reducer,

    [settingApi.reducerPath]: settingApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      apiSlice.middleware,
      categoryApi.middleware,
      subCategoryApi.middleware,
      offerBannerApi.middleware,
      homeBannerApi.middleware,
      topSaleBannerApi.middleware,
      aboutUsApi.middleware,
      counterApi.middleware,

      currentOpeningsApi.middleware,
      careerInfoApi.middleware,

      testimonialsApi.middleware,
      faqApi.middleware,

      mediaCoverageApi.middleware,
      privacyApi.middleware,
      returnRefundApi.middleware,
      returnRequestApi.middleware,
      contactApi.middleware,
      careerApi.middleware,

      blogCategoryApi.middleware,
      blogApi.middleware,

      termsApi.middleware,
      productsApi.middleware,

      settingApi.middleware,
      seoPagesApi.middleware,
    ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
