import { baseApi } from "../../api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    userRegister: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/createUser",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["User"],
    }),
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["User"],
    }),
    updateProfile: builder.mutation({
      query: ({ data, userId }) => ({
        url: `/auth/updateProfile/${userId}`,
        method: "PATCH",
        body: data,
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
    getAllUsers: builder.query({
      query: () => ({
        url: `/auth`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const {
  useUserRegisterMutation,
  useLoginMutation,
  useUpdatePasswordMutation,
  useUpdateProfileMutation,
  useGetAllUsersQuery,
} = authApi;
