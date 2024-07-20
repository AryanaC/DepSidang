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
import { registerUser } from "@/app/api/auth/route"; // Assume you have a register function
import Link from "next/link";
import { registerSchema } from "@/schemas/register-schema";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const data = {
      username,
      password,
      retype_password: retypePassword,
    };

    try {
      registerSchema.parse(data);
      const response = await registerUser(data);

      if (response.token) {
        const { token } = response;

        localStorage.setItem("token", token);

        toast({
          title: "Success",
          description: "Registered successfully.",
        });

        router.push("/dashboard");
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Registration failed.",
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
          description: "Registration failed.",
        });
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Register</CardTitle>
          <CardDescription>
            Create a new account by filling out the form below.
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
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                placeholder="Password..."
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="grid gap-2 mb-5">
              <Label htmlFor="retype_password">Retype Password</Label>
              <Input
                id="retype_password"
                type="password"
                value={retypePassword}
                placeholder="Retype Password..."
                onChange={(e) => setRetypePassword(e.target.value)}
              />
            </div>
            <CardFooter className="w-full flex justify-end">
              <div className="w-full space-y-3">
                <Button type="submit" className="w-full">
                  Register
                </Button>
                <span className="text-sm text-center flex justify-center">
                  Already have an account?&nbsp;<Link href={"/login"} className="text-blue-500 underline">Sign in</Link>
                </span>
              </div>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
