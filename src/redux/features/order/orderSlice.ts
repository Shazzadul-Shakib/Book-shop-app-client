import { baseApi } from "../../api/baseApi";

export const OrderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderSummery) => ({
        url: "/orders",
        method: "POST",
        body: orderSummery,
      }),
      invalidatesTags: ["Books", "Orders"],
    }),
    getSinglePersonsOrders: builder.query({
      query: (userId) => ({
        url: `/orders/${userId}`,
        method: "GET",
      }),
      providesTags: ["Books", "Orders"],
    }),
  }),
});

export const { useCreateOrderMutation, useGetSinglePersonsOrdersQuery } =
  OrderApi;
