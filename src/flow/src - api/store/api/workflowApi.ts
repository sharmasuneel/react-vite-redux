import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  PaymentPayload,
  RequestPayload,
  SSIPayload,
  DocumentPayload,
  CustomerPayload,
  ApiResponse,
} from "./types";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

export const workflowApi = createApi({
  reducerPath: "workflowApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Payments", "Requests", "SSI", "Documents", "Customers"],
  endpoints: (builder) => ({
    createPayment: builder.mutation<ApiResponse, PaymentPayload>({
      query: (body) => ({ url: "/payments", method: "POST", body }),
      invalidatesTags: ["Payments"],
    }),
    createRequest: builder.mutation<ApiResponse, RequestPayload>({
      query: (body) => ({ url: "/requests", method: "POST", body }),
      invalidatesTags: ["Requests"],
    }),
    createSSI: builder.mutation<ApiResponse, SSIPayload>({
      query: (body) => ({ url: "/ssi", method: "POST", body }),
      invalidatesTags: ["SSI"],
    }),
    uploadDocument: builder.mutation<ApiResponse, FormData>({
      query: (body) => ({ url: "/documents", method: "POST", body }),
      invalidatesTags: ["Documents"],
    }),
    createCustomer: builder.mutation<ApiResponse, CustomerPayload>({
      query: (body) => ({ url: "/customers", method: "POST", body }),
      invalidatesTags: ["Customers"],
    }),
  }),
});

export const {
  useCreatePaymentMutation,
  useCreateRequestMutation,
  useCreateSSIMutation,
  useUploadDocumentMutation,
  useCreateCustomerMutation,
} = workflowApi;
