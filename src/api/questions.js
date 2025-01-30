// Need to use the React-specific entry point to import createApi
import { api } from ".";

const tagInjection = api.enhanceEndpoints({ addTagTypes: [] });

// Define a service using a base URL and expected endpoints
export const questionsApi = tagInjection.injectEndpoints({
  endpoints: (builder) => ({
    getQuestions: builder.query({
      query: (params) => {
        return {
          params,
          url: "/api/admin/question",
          method: "get",
        };
      },
    }),
    addQuestion: builder.mutation({
      query: (body) => {
        return {
          body,
          url: "/api/admin/question",
          method: "post",
        };
      },
    }),
    editQuestion: builder.mutation({
      query: (body) => {
        return {
          body,
          url: "/api/admin/question",
          method: "patch",
        };
      },
    }),
    deleteQuestion: builder.mutation({
      query: (params) => {
        return {
          params,
          url: "/api/admin/question",
          method: "delete",
        };
      },
    }),
    getQuestionDetail: builder.query({
      query: (id) => {
        return {
          url: `/api/admin/question/${id}`,
          method: "get",
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetQuestionsQuery,
  useAddQuestionMutation,
  useEditQuestionMutation,
  useDeleteQuestionMutation,
  useGetQuestionDetailQuery,
} = questionsApi;
