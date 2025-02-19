import { baseApi } from "../../api/baseApi";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (data) => ({
        url: "/products",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Books"],
    }),
    getAllProduct: builder.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
      providesTags: ["Books"],
    }),
    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: ["Books"],
    }),
    deleteSingleProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
    updateSingleProduct: builder.mutation({
      query: ({ productId, updatedProduct }) => ({
        url: `/products/${productId}`,
        method: "PATCH",
        body: updatedProduct,
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetAllProductQuery,
  useGetSingleProductQuery,
  useDeleteSingleProductMutation,
  useUpdateSingleProductMutation,
} = productApi;
