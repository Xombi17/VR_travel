"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { z } from "zod";
import { registerSchema } from "@/lib/validations/auth";
import { useSupabaseAuth } from '@/contexts/supabase-auth-context';
import { Session } from "@supabase/supabase-js";

type FormErrors = {
  name?: string[];
  email?: string[];
  password?: string[];
  confirmPassword?: string[];
  form?: string;
};

type SignInResponse = {
  error?: string;
  success?: boolean;
  session?: Session;
};

export default function SignUp() {
  const router = useRouter();
  const { user } = useSupabaseAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSignedUp, setIsSignedUp] = useState(false);

  const validateForm = () => {
    try {
      registerSchema.parse({ name, email, password, confirmPassword });
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: FormErrors = {};
        error.errors.forEach((err) => {
          const path = err.path[0] as keyof FormErrors;
          if (!formattedErrors[path]) {
            formattedErrors[path] = [];
          }
          if (Array.isArray(formattedErrors[path])) {
            formattedErrors[path].push(err.message);
          }
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
      // Register the user
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          setErrors({ email: ["User with this email already exists"] });
        } else if (data.details) {
          const formattedErrors: FormErrors = {};
          data.details.forEach((err: any) => {
            const path = err.path[0] as keyof FormErrors;
            if (!formattedErrors[path]) {
              formattedErrors[path] = [];
            }
            if (typeof err.message === 'string') {
              formattedErrors[path].push(err.message);
            }
          });
          setErrors(formattedErrors);
        } else {
          setErrors({ form: [data.error || "Registration failed"] });
        }
        setIsLoading(false);
        return;
      }

      // Sign in the user after successful registration
      const result: SignInResponse = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setErrors({ form: ["Failed to sign in after registration"] });
        setIsLoading(false);
        return;
      }

      if (result?.success) {
        setIsSignedUp(true);
        localStorage.setItem('userSession', JSON.stringify(result.session));
        toast.success('Signup successful!');
      }

      // Redirect to home page
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Registration error:", error);
      setErrors({ form: ["Something went wrong. Please try again."] });
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-gray-900/60 p-8 shadow-2xl backdrop-blur-sm">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              href="/auth/signin"
              className="font-medium text-blue-400 hover:text-blue-300"
            >
              Sign in
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
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`relative block w-full rounded-md border-0 bg-gray-800 p-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? "border-red-500 ring-1 ring-red-500" : ""
                }`}
                placeholder="Full name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-400">{errors.name[0]}</p>
              )}
            </div>
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
                autoComplete="new-password"
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
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-300 mb-1">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`relative block w-full rounded-md border-0 bg-gray-800 p-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 ${
                  errors.confirmPassword ? "border-red-500 ring-1 ring-red-500" : ""
                }`}
                placeholder="Confirm Password"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-400">{errors.confirmPassword[0]}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full justify-center rounded-md bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70"
            >
              {isLoading ? "Creating account..." : "Create account"}
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

            <button
              disabled
              className="flex cursor-not-allowed items-center justify-center gap-2 rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-sm font-medium text-white opacity-50"
            >
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>GitHub</span>
            </button>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-gray-400">
          By signing up, you agree to our{" "}
          <Link href="/terms" className="text-blue-400 hover:text-blue-300">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-blue-400 hover:text-blue-300">
            Privacy Policy
          </Link>
          .
        </div>
      </div>
    </div>
  );
}
