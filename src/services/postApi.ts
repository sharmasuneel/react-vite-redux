import { api } from './api'

export interface Post {
  id: number
  userId: number
  title: string
  body: string
}

export const postsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => 'posts',
      providesTags: ['Posts'],
    }),

    addPost: builder.mutation<Post, Partial<Post>>({
      query: (body) => ({
        url: 'posts',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Posts'],
    }),
  }),
})

export const {
  useGetPostsQuery,
  useAddPostMutation,
} = postsApi
