"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useMemo, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useCreateUserMutation, useUpdateUserMutation } from "@/store/api/usersApi";
import { UserProps } from "@/types/UserProps";



const FormSchema = z.object({
    name: z
        .string()
        .min(3, {
            message: "name must be at least 3 characters.",
        })
        .max(30, { message: "name must be max 30 characters" }),
    email: z
        .string()
        .min(5, {
            message: "email must be at least 5 characters.",
        })
        .max(50, { message: "email must be max 30 characters" }).email(),
    phone: z
        .string()
        .min(11, {
            message: "phone number must be at least 11 characters.",
        })
        .max(11, { message: "phone number must be max 11 characters" }),
    address: z
        .string()
        .min(5, {
            message: "address must be at least 6 characters.",
        })
        .max(30, { message: "address must be max 30 characters" }),

});

const UpdateUser = ({ data,id }: any) => {
    const { toast } = useToast();
    const router = useRouter();
 

    const [updateUserData,{isSuccess,error,isLoading}] = useUpdateUserMutation();



    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    useEffect(() => {
        if (data) {
            form.reset({
                name:data?.name,
                email:data?.email,
                phone:data?.phone,
                address:data?.address
            });
        }
    }, [data]);

    //error message
    useEffect(() => {
        if (error) {
            toast({
                title: (error as any)?.data?.message,
                variant: "destructive",
            });
        }
    }, [error]);

    //success message
    useEffect(() => {
        if (isSuccess) {
            toast({
                title: "Update Successful",
                variant: "success",
            });

            router.push("/");

        }
    }, [isSuccess]);

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        //user object
        const updateData: UserProps = {
            _id:id,
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: data.address
        };

        //create user
        updateUserData(updateData);
    };

    return (
        <div className="h-screen bg-bgColor">
            <div className="grid  items-center  h-screen w-1/2 mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>Update User Information</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-1">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                                {/* name field */}
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* email field */}
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* phone field */}
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your phone" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* phone field */}
                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Address</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your address" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />



                                <Button disabled={isLoading} type="submit" className="w-full !mt-8">
                                    {isLoading ? "Loading..." : "Update"}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>

                    <CardFooter className="flex justify-center flex-col">

                        <Button asChild variant="outline" className="mt-6">
                            <Link href="/">Cancel</Link>
                        </Button>


                    </CardFooter>
                </Card>
            </div>

        </div>
    );
};

export default UpdateUser;
