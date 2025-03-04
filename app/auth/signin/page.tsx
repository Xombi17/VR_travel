"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { z } from "zod";
import { loginSchema } from "@/lib/validations/auth";

type FormErrors = {
  email?: string[];
  password?: string[];
  form?: string;
};

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = () => {
    try {
      loginSchema.parse({ email, password });
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: FormErrors = {};
        error.errors.forEach((err) => {
          const path = err.path[0] as keyof FormErrors;
          if (!formattedErrors[path]) {
            formattedErrors[path] = [];
          }
          formattedErrors[path]?.push(err.message);
        });
        setErrors(formattedErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Validate form
    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setErrors({ form: ["Invalid email or password"] });
        setIsLoading(false);
        return;
      }

      // Show success toast
      toast.success("Signed in successfully!", {
        description: "Welcome back to Virtual Voyage!",
      });

      // Redirect to home page or previous page
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Sign in error:", error);
      setErrors({ form: ["Something went wrong. Please try again."] });
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-gray-900/60 p-8 shadow-2xl backdrop-blur-sm">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Or{" "}
            <Link
              href="/auth/signup"
              className="font-medium text-blue-400 hover:text-blue-300"
            >
              create a new account
            </Link>
          </p>
        </div>

        {errors.form && (
          <div className="rounded-md bg-red-500/20 p-4 text-sm text-red-400">
            {errors.form[0]}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`relative block w-full rounded-md border-0 bg-gray-800 p-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? "border-red-500 ring-1 ring-red-500" : ""
                }`}
                placeholder="Email address"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email[0]}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`relative block w-full rounded-md border-0 bg-gray-800 p-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 ${
                  errors.password ? "border-red-500 ring-1 ring-red-500" : ""
                }`}
                placeholder="Password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password[0]}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-300"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link
                href="/auth/forgot-password"
                className="font-medium text-blue-400 hover:text-blue-300"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full justify-center rounded-md bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-gray-900 px-2 text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className="flex items-center justify-center gap-2 rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
            >
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
              </svg>
              <span>Google</span>
            </button>

            <Link
              href="/auth/supabase"
              className="flex items-center justify-center gap-2 rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
            >
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M21.97 5.8a1.84 1.84 0 0 0-1.75-1.25h-8.7c-.62 0-1.04.61-.83 1.19l.34.9c.12.33.43.57.8.57h8.7c.1 0 .18.09.15.18l-3.48 11.15a.2.2 0 0 1-.19.14h-5.8c-.1 0-.18-.09-.15-.18l3.47-11.15c.08-.26-.1-.52-.37-.52h-3.57c-.1 0-.18-.1-.15-.19l.37-1.17c.08-.26-.1-.52-.37-.52H6.15c-.1 0-.18.09-.15.18L2.5 16.05c-.08.26.1.52.37.52h10.13c.62 0 1.04-.61.83-1.19l-.34-.9c-.12-.33-.43-.57-.8-.57H4.01c-.1 0-.18-.09-.15-.18l3.47-11.15c.08-.26-.1-.52-.37-.52H3.89c-.1 0-.18.09-.15.18l-3.5 11.24c-.1.28.06.59.37.59h19.55c.58 0 1.1-.47 1.25-1.03l2.82-9.02c.15-.48-.01-1-.26-1.41z" />
              </svg>
              <span>Supabase</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
