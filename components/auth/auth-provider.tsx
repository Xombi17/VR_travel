"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import SupabaseProvider from "./supabase-provider";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  return (
    <SessionProvider>
      <SupabaseProvider>
        {children}
      </SupabaseProvider>
    </SessionProvider>
  );
}
