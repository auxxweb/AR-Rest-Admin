// Need to use the React-specific entry point to import createApi
import { api } from ".";

const tagInjection = api.enhanceEndpoints({ addTagTypes: [] });

// Define a service using a base URL and expected endpoints
export const participantApi = tagInjection.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardDetail: builder.query({
      query: () => {
        return {
          url: `/api/admin/getDashboardDetails`,
          method: "get",
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetDashboardDetailQuery
} = participantApi;
