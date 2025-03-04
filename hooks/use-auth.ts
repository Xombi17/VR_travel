"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

export function useAuth() {
  const { data: nextAuthSession, status: nextAuthStatus } = useSession();
  const [supabaseUser, setSupabaseUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial Supabase session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSupabaseUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for Supabase auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSupabaseUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    user: supabaseUser || nextAuthSession?.user || null,
    isAuthenticated: !!supabaseUser || nextAuthStatus === "authenticated",
    loading: loading || nextAuthStatus === "loading",
    provider: supabaseUser ? "supabase" : nextAuthSession ? "nextauth" : null,
  };
}
