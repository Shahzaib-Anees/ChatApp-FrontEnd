import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../axiosConfigs/axios.instance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setDataInUserState } from "../reducers/user.slice";
import { jwtDecode } from "jwt-decode";

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
        // Add user data to global state
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
    getUserDetails: builder.mutation({
      query: () => ({
        url: "user/userDetails",
        method: "GET",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setDataInUserState({ name: "info", data: data?.data }));
          dispatch(setDataInUserState({ name: "uid", data: data?.data?._id }));
        } catch (error) {
          console.log("Error fetching user details:", error);
        }
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
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        const accesstoken = data?.data?.accessToken;
        const decodedAccesstoken = jwtDecode(accesstoken);
        const userAccessToken: {
          token: string;
          expiresAt: number | undefined;
        } = {
          token: accesstoken,
          expiresAt: decodedAccesstoken?.exp
            ? decodedAccesstoken?.exp * 1000
            : undefined,
        };

        const refreshToken = data?.data?.refreshToken;
        const decodedrefreshtoken = jwtDecode(refreshToken);
        const userRefreshToken: {
          token: string;
          expiresAt: number | undefined;
        } = {
          token: refreshToken,
          expiresAt: decodedrefreshtoken?.exp
            ? decodedrefreshtoken?.exp * 1000
            : undefined,
        };

        await AsyncStorage.setItem(
          "accessToken",
          JSON.stringify(userAccessToken)
        );
        await AsyncStorage.setItem(
          "refreshToken",
          JSON.stringify(userRefreshToken)
        );
      },
    }),
    otpRequest: builder.mutation({
      query: ({ email, type }) => ({
        url: "user/requestCode",
        method: "POST",
        data: { email, type },
      }),
    }),
    refetchAccessToken: builder.mutation({
      query: ({ refreshToken }) => ({
        url: "user/refreshToken",
        method: "POST",
        data: { refreshToken },
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
  useGetUserDetailsMutation,
  useRefetchAccessTokenMutation,
} = authApi;

export {
  authApi,
  useLoginMutation,
  useRegisterMutation,
  useResetPasswordMutation,
  useVerifyOtpMutation,
  useOtpRequestMutation,
  useGetUserDetailsMutation,
  useRefetchAccessTokenMutation,
};
