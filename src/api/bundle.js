// Need to use the React-specific entry point to import createApi
import { api } from ".";

const tagInjection = api.enhanceEndpoints({ addTagTypes: [] });

// Define a service using a base URL and expected endpoints
export const bundlesApi = tagInjection.injectEndpoints({
  endpoints: (builder) => ({
    getBundles: builder.query({
      query: (params) => {
        return {
          params,
          url: "/api/admin/bundle",
          method: "get",
        };
      },
    }),
    addBundle: builder.mutation({
      query: (body) => {
        return {
          body,
          url: "/api/admin/bundle",
          method: "post",
        };
      },
    }),
    editBundle: builder.mutation({
      query: (body) => {
        return {
          body,
          url: "/api/admin/bundle",
          method: "patch",
        };
      },
    }),
    deleteBundle: builder.mutation({
      query: (params) => {
        return {
          params,
          url: "/api/admin/bundle",
          method: "delete",
        };
      },
    }),
    getBundleDetail: builder.query({
      query: (id) => {
        return {
          url: `/api/admin/bundle/${id}`,
          method: "get",
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetBundlesQuery,
  useAddBundleMutation,
  useEditBundleMutation,
  useDeleteBundleMutation,
  useGetBundleDetailQuery,
} = bundlesApi;
