import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
  BaseQueryFn,
  FetchArgs,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logoutUser, setUser } from "../features/auth/authSlice";

// Define the base query
const baseQuery = fetchBaseQuery({
  baseUrl: "https://book-shop-app-shazzadul-shakib.vercel.app/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

// Define the type for the refresh token response
interface RefreshTokenResponse {
  data: {
    token: string;
  };
}

// Wrap the base query with refresh token logic
const baseQueryWithRefreshToken: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // If the result is a 401 error, try to refresh the token
  if (result?.error?.status === 401) {
    const res = await fetch(
      "https://book-shop-app-shazzadul-shakib.vercel.app/api/auth/refreshtoken",
      {
        method: "POST",
        credentials: "include",
      }
    );

    if (!res.ok) {
      // Handle fetch errors
      console.error("Failed to refresh token");
      api.dispatch(logoutUser());
      return result;
    }

    const data: RefreshTokenResponse = await res.json();

    if (data.data.token) {
      const user = (api.getState() as RootState).auth.user;

      // Update the user with the new token
      api.dispatch(
        setUser({
          user,
          token: data.data.token,
        })
      );

      // Retry the original request with the new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Logout the user if the refresh token fails
      api.dispatch(logoutUser());
    }
  }

  return result;
};

// Create the API
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["Books", "Orders", "User"],
  endpoints: () => ({}),
});
