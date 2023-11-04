"use client";

import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from '../ui/button'
import Link from 'next/link'


const ShowUser = ({ data }: any) => {
    return (
        <div className='h-screen bg-bgColor grid place-items-center'>
            <Card className="w-1/2 !pt-6">
                <CardContent>
                    <CardTitle>{data?.name}</CardTitle>
                    <h3 className="text-black font-medium text-base mt-2">{data?.email}</h3>
                    <h3>{data?.phone}</h3>
                    <h3>{data?.address}</h3>
                </CardContent>
                <CardFooter>
                    <Button asChild>
                        <Link href="/">Go To Home Page</Link>
                    </Button>
                </CardFooter>
            </Card>

        </div>
    )
}

export default ShowUser