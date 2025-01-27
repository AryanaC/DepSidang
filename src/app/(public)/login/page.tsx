"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginUser } from "@/app/api/auth/route";
import { setAuthToken } from "@/lib/actions";
import { loginSchema } from "@/schemas/login-schema";
import Link from "next/link";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const data = {
      username,
      password,
    };

    try {
      loginSchema.parse(data);
      const response = await loginUser(data);

      if (response.token) {
        const { token } = response;

        localStorage.setItem("token", token);

        setAuthToken(token);

        toast({
          title: "Success",
          description: "Logged in successfully.",
        });

        router.push("/dashboard");
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Invalid username or password.",
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          toast({
            variant: "destructive",
            title: "Validation Error",
            description: err.message,
          });
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Invalid username or password.",
        });
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>
            Enter your username and password to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-2 mb-5">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username..."
              />
            </div>
            <div className="grid gap-2 mb-5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                placeholder="Password..."
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <CardFooter className="w-full flex justify-end">
              <div className="w-full space-y-3">
                <Button type="submit" className="w-full">
                  Sign In
                </Button>
                <span className="text-sm text-center flex justify-center">
                  Dont have an account yet?&nbsp;<Link href={"/register"} className="text-blue-500 underline">Register</Link>
                </span>
              </div>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
