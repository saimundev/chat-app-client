import { UserProps } from '@/types/UserProps';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5050/api/',
    prepareHeaders(headers, { getState }) {
      const redusers = getState();
      const token = (redusers as any)?.auth?.userToken;
      headers.set("authorization", token ? `Bearer ${token}` : "");
      return headers;
    },

  }),

  tagTypes: ['User'],
  endpoints: (builder) => ({

    getUser: builder.query<UserProps[] | { page: string }, UserProps[] | { page: string }>({
      query: ({ page }: { page: string }) => ({
        method: "GET",
        url: `user/get-user?page=${page}`,
      }),

      providesTags:["User"]
    }),

    getUserById: builder.query<UserProps | { id?: string }, UserProps | { id?: string }>({
      query: ({ id }: { id: string }) => ({
        method: "GET",
        url: `user/get-userById/${id}`,
      }),
      providesTags:["User"]
    }),

    createUser: builder.mutation<UserProps, UserProps>({
      query: (user) => ({
        method: "POST",
        url: "user/create-user",
        body: user
      }),
      invalidatesTags:["User"]
    }),

    updateUser: builder.mutation<UserProps, UserProps>({
      query: (user) => ({
        method: "PUT",
        url: `user/update-user/${user?._id}`,
        body: user
      }),
      invalidatesTags:["User"]
    }),

    deleteUser: builder.mutation<{ id: string }, { id: string }>({
      query: ({ id }: { id: string }) => ({
        method: "DELETE",
        url: `user/delete-user/${id}`,
      }),
      invalidatesTags:["User"]
    }),


  }),
})



export const { useGetUserQuery,useUpdateUserMutation, useCreateUserMutation, useGetUserByIdQuery, useDeleteUserMutation } = usersApi