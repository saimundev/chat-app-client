"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import EyeOpenIcon from "./icon/EyeOpenIcon";
import { useEffect, useState } from "react";
import EyeCloseIcon from "./icon/EyeCloseIcon";
import { useToast } from "@/components/ui/use-toast";
import { useSignUpMutation } from "@/store/api/userApi";
import { SignUpProps } from "@/types/AuthProps";
import { useAppDispatch } from "@/store/hooks";
import { getUser } from "@/store/features/authSlice";
import {  setCookie,getCookie } from 'cookies-next';

const FormSchema = z
  .object({
    name: z
      .string()
      .min(3, {
        message: "name must be at least 3 characters.",
      })
      .max(30, { message: "name must be max 30 characters" }),
    email: z
      .string()
      .min(6, {
        message: "email must be at least 6 characters.",
      })
      .max(30, { message: "email must be max 30 characters" })
      .email(),
    password: z
      .string()
      .min(5, {
        message: "password must be at least 5 characters.",
      })
      .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
      .regex(new RegExp(".*[a-z].*"), "One lowercase character")
      .regex(new RegExp(".*\\d.*"), "One number")
      .regex(
        new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
        "One special character"
      ),
    confirmPassword: z.string().min(5, {
      message: "password must be at least 5 characters.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password and confirm password not match",
  });

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const route = useRouter();
  const [createUser, { isSuccess, isLoading, error, data }] =
    useSignUpMutation();
    const dispatch = useAppDispatch();
 

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
        title: "Account create successful",
        variant: "success",
      });

      route.push("/email-verification");

      //store data in cookie storage
      setCookie("userToken",(data as any)?.token)
      dispatch(getUser((data as any )?.token))

    }
  }, [isSuccess]);

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    //user object
    const newUser: SignUpProps = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    //create user
    createUser(newUser);
  };


 

  return (
    <div className="grid place-items-center h-screen">
      <Card className="w-1/3 mx-auto">
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
        </CardHeader>
        <CardContent>
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

              {/* confirm password field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          {...field}
                        />
                      </FormControl>
                      <div
                        className=""
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <EyeOpenIcon className="w-6 h-6  absolute top-[50%] translate-y-[-50%] right-2 cursor-pointer" />
                        ) : (
                          <EyeCloseIcon className="w-6 h-6  absolute top-[50%] translate-y-[-50%] right-2 cursor-pointer" />
                        )}
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* password field */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          {...field}
                        />
                      </FormControl>
                      <div
                        className=""
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <EyeOpenIcon className="w-6 h-6  absolute top-[50%] translate-y-[-50%] right-2 cursor-pointer" />
                        ) : (
                          <EyeCloseIcon className="w-6 h-6  absolute top-[50%] translate-y-[-50%] right-2 cursor-pointer" />
                        )}
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isLoading} type="submit">
                {isLoading ? "Loading..." : "Submit"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
