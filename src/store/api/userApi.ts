import { SignUpProps,SignInProps, EmailVerifyProps } from '@/types/AuthProps'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5050/api/' }),
    
    endpoints: (builder) => ({

      signUp: builder.mutation<SignUpProps, SignUpProps>({
        query: (data) => ({
            method:"POST",
            url:"auth/sign-up",
            body:data
        }),
        
      }),

      signIn: builder.mutation<SignInProps, SignInProps>({
        query: (data) => ({
            method:"POST",
            url:"auth/sign-in",
            body:data
        }),
      }),

      emailVerification: builder.mutation<EmailVerifyProps, EmailVerifyProps>({
        query: ({token}) => ({
            method:"POST",
            url:`auth/email-verifier?token=${token}`,
        }),
      }),


      getUser: builder.query({
        query: ({friendId}) => ({
            method:"GET",
            url:`auth/get-user/${friendId}`,
        }),
      }),


    }),
  })



  export const { useSignUpMutation,useSignInMutation,useEmailVerificationMutation,useGetUserQuery } = userApi