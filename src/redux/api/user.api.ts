import { mainApi } from './index'

const extendedApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({
      query: (params) => ({
        method: "GET",
        url:  '/students',
        params
      }),
      providesTags: ['STUDENTS']
    }),
    createUser: build.mutation({
      query: (body) => ({
        method: "POST",
        url: "/students",
        body
      }),
      invalidatesTags: ['STUDENTS']
    }),
    updateUser: build.mutation({
      query: ({id, body})=> ({
        method: "PUT",
        url: `/students/${id}`,
        body
      }),
      invalidatesTags: ['STUDENTS']
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/students/${id}`
      }),
      invalidatesTags: ['STUDENTS']
    })
  }),
  overrideExisting: false,
})

export const { useGetUsersQuery, useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation } = extendedApi