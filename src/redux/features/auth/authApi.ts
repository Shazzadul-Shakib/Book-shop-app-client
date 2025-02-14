import { baseApi } from "../../api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["User"],
    }),
    updatePassword: builder.mutation({
      query: ({ data, userId }) => ({
        url: `/auth/updatePassword/${userId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useLoginMutation, useUpdatePasswordMutation } = authApi;
