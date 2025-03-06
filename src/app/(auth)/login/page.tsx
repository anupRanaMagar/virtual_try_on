"use client";
import { handleLogin, loginWithGithub, loginWithGoogle } from "@/actions/auth";
import React, { useState, useTransition, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [hidePassword, setHidePassword] = useState(true);
  const [isPending, startTransition] = useTransition();
  const passwordRef = useRef<HTMLInputElement>(null); // Ref for password input

  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with another account"
      : "";

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleTogglePasswordVisibility = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent button from stealing focus
    setHidePassword((prev) => !prev);
    // Use setTimeout to ensure focus is set after state update
    setTimeout(() => {
      if (passwordRef.current) {
        passwordRef.current.focus();
        // Optionally, move cursor to end of input
        const length = passwordRef.current.value.length;
        passwordRef.current.setSelectionRange(length, length);
      }
    }, 0);
  };

  const handleCredentialLogin = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      handleLogin(values).then((result) => {
        setError(result?.error);
        setSuccess(result?.success);
      });
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-semibold text-center text-zinc-400 mb-8">
          Try On
        </h1>

        <div className="space-y-4">
          <button
            className="w-full flex items-center justify-center px-4 py-2 bg-white rounded-3xl border hover:bg-slate-200"
            onClick={() => loginWithGoogle()}
            disabled={isPending}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 48 48"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              />
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              />
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              />
            </svg>
            <span className="text-black ml-2">Continue with Google</span>
          </button>

          <button
            className="w-full flex items-center justify-center px-4 py-2 bg-white rounded-3xl border hover:bg-slate-200"
            onClick={() => loginWithGithub()}
            disabled={isPending}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 24 24"
            >
              <path d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.5,4.7,2.2,8.9,6.3,10.5C8.7,21.4,9,21.2,9,20.8v-1.6c0,0-0.4,0.1-0.9,0.1 c-1.4,0-2-1.2-2.1-1.9c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1 c0.4,0,0.7-0.1,0.9-0.2c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6C7,7.2,7,6.6,7.3,6 c0,0,1.4,0,2.8,1.3C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3C15.3,6,16.8,6,16.8,6C17,6.6,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4 c0.7,0.8,1.2,1.8,1.2,3c0,2.2-1.7,3.5-4,4c0.6,0.5,1,1.4,1,2.3v2.6c0,0.3,0.3,0.6,0.7,0.5c3.7-1.5,6.3-5.1,6.3-9.3 C22,6.1,16.9,1.4,10.9,2.1z" />
            </svg>
            <span className="text-black ml-2">Continue with Github</span>
          </button>
        </div>

        <div className="flex items-center my-6">
          <div className="border-t border-gray-300 flex-grow"></div>
          <span className="mx-2 text-gray-500">OR</span>
          <div className="border-t border-gray-300 flex-grow"></div>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(() =>
              handleCredentialLogin(form.getValues())
            )}
            className="space-y-3"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter your email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        disabled={isPending}
                        {...field}
                        type={hidePassword ? "password" : "text"}
                        name="password"
                        id="password"
                        placeholder="Enter your Password"
                        className="pr-10"
                        ref={passwordRef} // Attach ref to the input
                      />
                      <button
                        type="button"
                        onClick={handleTogglePasswordVisibility}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                        disabled={isPending}
                        aria-label={
                          hidePassword ? "Show password" : "Hide password"
                        }
                      >
                        {hidePassword ? (
                          <Eye className="h-5 w-5" />
                        ) : (
                          <EyeOff className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error || urlError ? (
              <FormError message={error || urlError} />
            ) : null}
            {success ? <FormSuccess message={success} /> : null}

            <Button
              disabled={isPending}
              type="submit"
              className="w-full bg-primary-700 text-white px-4 py-2 rounded-md shadow hover:bg-primary-600"
            >
              Log in
            </Button>
            <p className="text-center mt-4">
              Don&apos;t have an account?{" "}
              <a href="/signup" className="font-semibold underline">
                Click here
              </a>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
