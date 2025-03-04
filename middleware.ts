import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  
  // Initialize Supabase middleware client
  const supabase = createMiddlewareClient({ req, res });
  
  // Check Supabase session
  const { data: { session: supabaseSession } } = await supabase.auth.getSession();
  
  // Check NextAuth session
  const nextAuthSession = await getToken({ 
    req, 
    secret: process.env.NEXTAUTH_SECRET 
  });
  
  // User is authenticated if they have either a NextAuth or Supabase session
  const isAuthenticated = !!nextAuthSession || !!supabaseSession;
  const pathname = req.nextUrl.pathname;

  // Define protected routes
  const protectedRoutes = ["/profile", "/favorites", "/bookings"];
  const isProtectedRoute = protectedRoutes.some((route) => 
    pathname === route || pathname.startsWith(`${route}/`)
  );

  // Define auth routes
  const authRoutes = ["/auth/signin", "/auth/signup"];
  const isAuthRoute = authRoutes.some((route) => pathname === route);

  // Redirect authenticated users away from auth pages
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Redirect unauthenticated users away from protected pages
  if (isProtectedRoute && !isAuthenticated) {
    const redirectUrl = new URL("/auth/signin", req.url);
    redirectUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    "/profile/:path*",
    "/favorites/:path*",
    "/bookings/:path*",
    "/auth/signin",
    "/auth/signup",
  ],
};
