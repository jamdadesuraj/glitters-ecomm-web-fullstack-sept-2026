import { configureStore } from "@reduxjs/toolkit";
import { homeBannerApi } from "./homeBannerApi";
import { categoryApi } from "./categoriesApi";
import { subCategoryApi } from "./subCategoryApi";
import { offerBannerApi } from "./offerBannerApi";
import { topSaleBannerApi } from "./topSaleBannerApi";

export const store = configureStore({
  reducer: {
    categoryApi: categoryApi.reducer,
    subCategoryApi: subCategoryApi.reducer,
    homeBannerApi: homeBannerApi.reducer,
    offerBannerApi: offerBannerApi.reducer,
    topSaleBannerApi: topSaleBannerApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      categoryApi.middleware,
      subCategoryApi.middleware,
      homeBannerApi.middleware,
      offerBannerApi.middleware,
      topSaleBannerApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
