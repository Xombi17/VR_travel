import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    
    // Exchange the code for a session
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (error) {
      console.error('Error exchanging code for session:', error);
      return NextResponse.redirect(
        `${requestUrl.origin}/login?error=${encodeURIComponent(error.message)}`
      );
    }

    if (data?.user) {
      try {
        // Check if user already exists in our database
        const existingUser = await prisma.user.findFirst({
          where: {
            OR: [
              { email: data.user.email },
              { externalId: data.user.id }
            ]
          }
        });

        if (!existingUser && data.user.email) {
          // Create a new user in our database
          await prisma.user.create({
            data: {
              name: data.user.user_metadata.full_name || data.user.email.split('@')[0],
              email: data.user.email,
              externalId: data.user.id,
              emailVerified: new Date(),
              image: data.user.user_metadata.avatar_url || null
            }
          });
        } else if (existingUser && !existingUser.externalId) {
          // Update existing user with Supabase ID
          await prisma.user.update({
            where: { id: existingUser.id },
            data: { externalId: data.user.id }
          });
        }
      } catch (dbError) {
        console.error('Error syncing user with database:', dbError);
      }
    }
  }

  // Redirect to the home page
  return NextResponse.redirect(requestUrl.origin);
}
