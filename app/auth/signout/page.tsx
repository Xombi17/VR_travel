"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SignOut() {
  const router = useRouter();

  useEffect(() => {
    const handleSignOut = async () => {
      try {
        await signOut({ redirect: false });
        
        // Show success toast
        toast.success("Signed out successfully", {
          description: "You have been signed out of your account",
        });
        
        router.push("/");
        router.refresh();
      } catch (error) {
        console.error("Sign out error:", error);
        toast.error("Failed to sign out", {
          description: "Please try again",
        });
      }
    };

    handleSignOut();
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-gray-900/60 p-8 text-center shadow-2xl backdrop-blur-sm">
        <h2 className="text-3xl font-bold tracking-tight">Signing out...</h2>
        <p className="text-gray-400">You will be redirected to the home page.</p>
        <div className="flex justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
        </div>
      </div>
    </div>
  );
}
