import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { supabase } from "@/lib/supabase";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // First try to authenticate with Supabase
          if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
            const { data, error } = await supabase.auth.signInWithPassword({
              email: credentials.email,
              password: credentials.password,
            });

            if (data?.user) {
              return {
                id: data.user.id,
                name: data.user.user_metadata?.name || data.user.email?.split('@')[0],
                email: data.user.email,
                image: data.user.user_metadata?.avatar_url,
              };
            }

            // If Supabase auth fails, fall back to local database
            console.log("Supabase auth failed, falling back to local database");
          }

          // Find the user in the local database
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          // If user doesn't exist or password doesn't match
          if (!user || !user.password) {
            return null;
          }

          // Compare the provided password with the hashed password
          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!passwordMatch) {
            return null;
          }

          // Return the user without the password
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
          };
        } catch (error) {
          console.error("Error during authentication:", error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
  },
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub as string;
      }
      return session;
    },
  },
};

// This function is required for dynamic route segments
export function generateStaticParams() {
  return [
    { nextauth: ["signin"] },
    { nextauth: ["signout"] },
    { nextauth: ["session"] },
    { nextauth: ["callback"] },
    { nextauth: ["providers"] },
    { nextauth: ["error"] },
    { nextauth: ["csrf"] },
  ];
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
