"use client";

import React, { useState } from 'react'
import UpdateUser from '@/components/update-user/UpdateUser'
import { useGetUserByIdQuery } from '@/store/api/usersApi';
import Loading from '@/components/shared/Loading';


type ParamsProps = {
    params: {
        id: string
    }
}

const Details = ({ params: { id } }: ParamsProps) => {
    const { data, isLoading, isError } = useGetUserByIdQuery({ id })
    if(isLoading) return <div className="flex justify-center mt-10"><Loading/></div>
  return (
    <div>
         <UpdateUser data={data} id={id}/>
    </div>
  )
}

export default Details