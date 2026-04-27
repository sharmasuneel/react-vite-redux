import { configureStore } from "@reduxjs/toolkit";
import { workflowApi } from "./api/workflowApi";

export const store = configureStore({
  reducer: {
    [workflowApi.reducerPath]: workflowApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(workflowApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
