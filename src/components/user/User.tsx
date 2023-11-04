"use client"

import { useDeleteUserMutation, useGetUserQuery } from '@/store/api/usersApi'
import React, { useEffect } from 'react'
import Container from '../shared/Container';
import { UserProps } from '@/types/UserProps';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useRouter, useSearchParams } from "next/navigation"
import { useToast } from '../ui/use-toast';
import Loading from '../shared/Loading';
import { deleteCookie } from 'cookies-next';

const User = () => {
  const router = useRouter();
  const params = useSearchParams();
  const page = params.get("page") ?? "1"
  const { data, isLoading, isError } = useGetUserQuery({ page });
  const [userDelete, { isLoading: loding, isError: error, isSuccess }] = useDeleteUserMutation();
  const { toast } = useToast();

  //success message
  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Delete Successful",
        variant: "success",
      });

    }
  }, [isSuccess]);

  const handleDelete = (id?: string) => {
    if (id) {
      userDelete({ id })
    }
  }

  const hanldeLogOut = () => {
    deleteCookie("userToken")
    router.push("/sign-in")
  }

  return (
    <div className="h-screen bg-bgColor">
      <Container className='pt-10'>

        <div className="bg-white">
          <div className="px-6 pt-4 flex justify-between">
            <Button size="lg" asChild>
              <Link href="/create-user">
                Add User
              </Link>
            </Button>

            <Button variant="destructive" onClick={hanldeLogOut}>LogOut</Button>
          </div>
          {isLoading ? <div className="flex justify-center pb-4"> <Loading /></div> :
            <div className="relative overflow-x-auto bg-white mt-10">
              <table className="w-full text-sm text-left rounded text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-white ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Phone
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Address
                    </th>
                    <th scope="col" className="px-6 py-3">
                      View
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Edit
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>

                  {(data as any)?.user &&
                    (data as any)?.user?.map((user: UserProps) => (
                      <tr key={user._id} className="bg-white border-b last:border-none border-gray-300">
                        <td className='px-6 py-2 text-gray-700 font-medium text-sm'>{user.name}</td>
                        <td className='px-6 py-2 text-gray-700 font-medium text-sm'>{user.email}</td>
                        <td className='px-6 py-2 text-gray-700 font-medium text-sm'>{user.phone}</td>
                        <td className='px-6 py-2 text-gray-700 font-medium text-sm'>{user.address}</td>
                        <td className='px-6 py-2 text-gray-700 font-medium text-sm'><Button size="sm" asChild><Link href={`/${user._id}`}>View</Link></Button></td>
                        <td className='px-6 py-2 text-gray-700 font-medium text-sm'><Button size="sm" variant="success"><Link href={`/update-user/${user._id}`}>Edit</Link></Button></td>
                        <td className='px-6 py-2 text-gray-700 font-medium text-sm'><Button size="sm" variant="destructive" onClick={() => handleDelete(user._id)}>Delete</Button></td>
                      </tr>
                    ))
                  }


                </tbody>
              </table>

              {/* pagenation */}
              <div className="flex justify-end py-6 pr-10 gap-6">
                <Button disabled={Number(page) === 1} onClick={() => router.push(`?page=${Number(page) - 1}`)}>PREV</Button>
                <Button disabled={Number(page) === (data as any)?.pagenation?.pageCount} onClick={() => router.push(`?page=${Number(page) + 1}`)}>NEXT</Button>
              </div>
            </div>
          }
        </div>

      </Container>
    </div>
  )
}

export default User