// Need to use the React-specific entry point to import createApi
import { api } from ".";

const tagInjection = api.enhanceEndpoints({ addTagTypes: [] });

// Define a service using a base URL and expected endpoints
export const authApi = tagInjection.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => {
        return {
          body,
          url: "/api/admin/auth/login",
          method: "post",
        };
      },
    }),
    forgotPassword: builder.mutation({
      query: (body) => {
        return {
          body,
          url: "/api/admin/auth/forgetPassword",
          method: "post",
        };
      },
    }),
    changePassword: builder.mutation({
      query: (body) => {
        return {
          body,
          url: "/api/admin/auth/changePassword",
          method: "post",
        };
      },
    }),
    updatePassword: builder.mutation({
      query: (body) => {
        return {
          body,
          url: "/api/admin/updatePassword",
          method: "patch",
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useLoginMutation,
  useForgotPasswordMutation,
  useChangePasswordMutation,
  useUpdatePasswordMutation,
} = authApi;
