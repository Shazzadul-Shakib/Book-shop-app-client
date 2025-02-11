import { baseApi } from "../../api/baseApi";

export const OrderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderSummery) => ({
        url: "/orders",
        method: "POST",
        body: orderSummery,
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});

export const { useCreateOrderMutation } = OrderApi;
