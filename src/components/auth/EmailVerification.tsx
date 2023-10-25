"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const EmailVerification = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="text-center w-3/4">
        <CardHeader>
          <CardTitle className="">Verify your email address</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            You have entered <strong>saimunshezan@gmail.com</strong> as the email address for
            your account
          </p>
          <p className="mt-2">
            Plese Verify your email address
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailVerification;
