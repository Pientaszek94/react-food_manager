import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl =
  import.meta.env.NODE_ENV !== 'production'
    ? 'http://127.0.0.1:5000/'
    : import.meta.env.VITE_SERVER_URL

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.userToken
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
        return headers
      }
    },
  }),
    endpoints: (build) => ({
      getUserDetails: build.query({
        query: () => ({
          url: 'api/v1/users/profile',
          method: 'GET',
        }),
    }),
    deleteUser: build.mutation({
      query:() => ({
        url:'api/v1/users/disable',
        method:'PATCH'
      })
    }),
    updateUser: build.mutation({
      query:(user) => ({
        url:'api/v1/users/update/singles',
        method:'PATCH',
        body: user
      })
    }),
    pushUserRecipes: build.mutation({
      query:(user) => ({
        url:'api/v1/users/update/pusharray',
        method:'PATCH',
        body: user
      })
    }),
    pullUserRecipes: build.mutation({
      query:(user) => ({
        url:'api/v1/users/update/pullarray',
        method:'PATCH',
        body: user
      })
    }),
  }),
})

// export react hook
export const { useGetUserDetailsQuery, 
                useDeleteUserMutation, 
                useUpdateUserMutation, 
                usePushUserRecipesMutation,
                 usePullUserRecipesMutation } = authApi

