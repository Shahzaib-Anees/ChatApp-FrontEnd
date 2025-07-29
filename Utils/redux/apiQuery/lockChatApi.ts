import { axiosBaseQuery } from "@/Utils/axiosConfigs/axios.instance";
import { createApi } from "@reduxjs/toolkit/query/react";

const lockChatApi = createApi({
  reducerPath: "lockChatApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    setSecretCode: builder.mutation({
      query: ({ code }) => ({
        url: "chat/setSecurityCode",
        method: "POST",
        data: { secretCode: code },
      }),
    }),
    verifySecretCode: builder.mutation({
      query: ({ code }) => ({
        url: "chat/verifySecurityCode",
        method: "POST",
        data: { secretCode: code },
      }),
    }),
  }),
});

const { useSetSecretCodeMutation, useVerifySecretCodeMutation } = lockChatApi;
export { lockChatApi, useSetSecretCodeMutation, useVerifySecretCodeMutation };
