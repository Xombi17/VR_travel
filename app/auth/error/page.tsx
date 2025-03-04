"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

export default function AuthError() {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const errorParam = searchParams.get("error");
    
    if (errorParam) {
      let errorMessage = "An unexpected error occurred during authentication.";
      
      switch (errorParam) {
        case "Configuration":
          errorMessage = "There is a problem with the server configuration.";
          break;
        case "AccessDenied":
          errorMessage = "You do not have access to this resource.";
          break;
        case "Verification":
          errorMessage = "The verification link may have been used or is invalid.";
          break;
        case "CredentialsSignin":
          errorMessage = "Invalid email or password. Please try again.";
          break;
        case "OAuthAccountNotLinked":
          errorMessage = "This email is already associated with another account.";
          break;
        case "OAuthSignin":
          errorMessage = "Error during OAuth sign in. Please try again.";
          break;
        case "OAuthCallback":
          errorMessage = "Error during OAuth callback. Please try again.";
          break;
        case "EmailSignin":
          errorMessage = "Error sending the verification email. Please try again.";
          break;
        case "SessionRequired":
          errorMessage = "You must be signed in to access this page.";
          break;
      }
      
      setError(errorMessage);
      
      // Show error toast
      toast.error("Authentication Error", {
        description: errorMessage,
      });
    }
  }, [searchParams]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-gray-900/60 p-8 text-center shadow-2xl backdrop-blur-sm">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-500/20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-bold tracking-tight">
          Authentication Error
        </h2>
        <p className="text-gray-400">{error || "An error occurred during authentication."}</p>
        <div className="pt-4 space-y-4">
          <Link
            href="/auth/signin"
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Return to Sign In
          </Link>
          <div>
            <Link
              href="/"
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
