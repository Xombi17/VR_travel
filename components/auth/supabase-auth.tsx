"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function SupabaseAuth() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      if (authMode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });

        if (error) {
          toast.error("Sign in failed", {
            description: error.message,
          });
          return;
        }

        toast.success("Signed in successfully");
        router.push("/");
        router.refresh();
      } else {
        const { error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
        });

        if (error) {
          toast.error("Sign up failed", {
            description: error.message,
          });
          return;
        }

        toast.success("Signed up successfully", {
          description: "Please check your email for verification instructions",
        });
        setAuthMode("signin");
        reset();
      }
    } catch (error) {
      console.error("Authentication error:", error);
      toast.error("Authentication failed", {
        description: "An unexpected error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        toast.error("Google sign in failed", {
          description: error.message,
        });
      }
    } catch (error) {
      console.error("Google sign in error:", error);
      toast.error("Google sign in failed", {
        description: "An unexpected error occurred",
      });
    }
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">
          {authMode === "signin" ? "Sign in with Supabase" : "Create a Supabase account"}
        </h2>
        <p className="mt-2 text-sm text-gray-400">
          {authMode === "signin"
            ? "Enter your email and password to sign in"
            : "Enter your details to create an account"}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
            disabled={isLoading}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
            disabled={isLoading}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 py-2 px-4 text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading
            ? "Loading..."
            : authMode === "signin"
            ? "Sign In"
            : "Sign Up"}
        </button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-700"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-gray-900 px-2 text-gray-400">Or continue with</span>
        </div>
      </div>

      <button
        type="button"
        onClick={signInWithGoogle}
        className="flex w-full items-center justify-center rounded-md border border-gray-700 bg-gray-800 py-2 px-4 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        disabled={isLoading}
      >
        <svg
          className="mr-2 h-5 w-5"
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
        </svg>
        Google
      </button>

      <div className="text-center text-sm">
        {authMode === "signin" ? (
          <p className="text-gray-400">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={() => setAuthMode("signup")}
              className="text-blue-400 hover:text-blue-300"
            >
              Sign up
            </button>
          </p>
        ) : (
          <p className="text-gray-400">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => setAuthMode("signin")}
              className="text-blue-400 hover:text-blue-300"
            >
              Sign in
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
