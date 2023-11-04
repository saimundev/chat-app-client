"use client";

import React from 'react'
import Loading from '@/components/shared/Loading';
import ShowUser from '@/components/show-user/ShowUser';
import { useGetUserByIdQuery } from '@/store/api/usersApi'


type ParamsProps = {
  params: {
    id: string
  }
}

const UserView = ({ params: { id } }: ParamsProps) => {
  const { data, isLoading, isError } = useGetUserByIdQuery({ id })
  if (isError) return <div className="text-center mt-10 font-semibold text-xl text-red-500">Something went wrong</div>
  if (isLoading) return <div className="flex justify-center mt-10"> <Loading /> </div>
  return (
    <div>
      <ShowUser data={data} />
    </div>
  )
}

export default UserView