import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { registerSchema } from "@/lib/validations/auth";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate request body
    const validation = registerSchema.omit({ confirmPassword: true }).safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.error.format() },
        { status: 400 }
      );
    }

    const { name, email, password } = validation.data;

    // Check if user already exists in local database
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Generate avatar URL
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;
    
    // Try to register with Supabase if credentials are available
    let supabaseUser = null;
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name,
              avatar_url: avatarUrl,
            },
          },
        });

        if (error) {
          console.error("Supabase registration error:", error);
        } else {
          supabaseUser = data.user;
          console.log("User registered with Supabase:", supabaseUser?.id);
        }
      } catch (supabaseError) {
        console.error("Supabase registration exception:", supabaseError);
      }
    }

    // Hash the password for local database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in local database
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        image: avatarUrl,
        // If we have a Supabase user, store its ID for reference
        ...(supabaseUser ? { externalId: supabaseUser.id } : {}),
      },
    });

    // Return the user without the password
    return NextResponse.json(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        supabaseId: supabaseUser?.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
