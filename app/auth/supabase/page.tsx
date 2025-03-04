"use client";

import { SupabaseAuth } from "@/components/auth/supabase-auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function SupabaseAuthPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="w-full max-w-md space-y-8">
        <Card className="border-gray-700 bg-gray-800 text-white shadow-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Supabase Authentication
            </CardTitle>
            <CardDescription className="text-center text-gray-400">
              Sign in or create an account using Supabase
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SupabaseAuth />
          </CardContent>
        </Card>
        
        <div className="text-center">
          <Link 
            href="/auth/signin" 
            className="text-sm text-blue-400 hover:text-blue-300"
          >
            ← Back to NextAuth Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
