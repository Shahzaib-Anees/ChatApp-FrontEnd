import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../axiosConfigs/axios.instance";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        console.log("User Data ==>", data);
      },
    }),
    register: builder.mutation({
      query: ({ username, email, password }) => ({
        url: "user/register",
        method: "POST",
        data: { username, email, password },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        console.log("User Data ==>", data);
      },
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
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        const token = data?.accessToken;
        console.log("Token ==>", token);

        await AsyncStorage.setItem("token", token);
      },
    }),
    otpRequest: builder.mutation({
      query: ({ email, type }) => ({
        url: "user/requestCode",
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
