import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../axiosConfigs/axios.instance";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "user/login",
        method: "POST",
        data: { email, password },
      }),
    }),
    register: builder.mutation({
      query: ({ name, email, password }) => ({
        url: "user/register",
        method: "POST",
        data: { name, email, password },
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ email, password }) => ({
        url: "user/resetPassword",
        method: "POST",
        data: { email, password },
      }),
    }),
    verifyOtp: builder.mutation({
      query: ({ email, code, type }) => ({
        url: "user/verifyCode",
        method: "POST",
        data: { email, code, type },
      }),
    }),
    otpRequest: builder.mutation({
      query: ({ email, type }) => ({
        url: "user/sentCode",
        method: "POST",
        data: { email, type },
      }),
    }),
  }),
});

const {
  useLoginMutation,
  useRegisterMutation,
  useResetPasswordMutation,
  useVerifyOtpMutation,
  useOtpRequestMutation,
} = authApi;

export {
  authApi,
  useLoginMutation,
  useRegisterMutation,
  useResetPasswordMutation,
  useVerifyOtpMutation,
  useOtpRequestMutation,
};
