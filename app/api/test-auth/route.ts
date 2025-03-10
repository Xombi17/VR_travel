import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json(
      { 
        authenticated: false,
        message: "Not authenticated",
        session: null
      },
      { status: 401 }
    );
  }

  return NextResponse.json({
    authenticated: true,
    message: "Authenticated",
    session: {
      user: {
        id: session.user?.id,
        name: session.user?.name,
        email: session.user?.email,
        image: session.user?.image,
      },
      expires: session.expires,
    }
  });
}
