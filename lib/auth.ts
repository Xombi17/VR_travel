import { auth as getAuth } from "@/auth";

export async function getSession() {
  return await getAuth();
}

export async function getCurrentUser() {
  const session = await getSession();
  
  if (!session?.user?.email) {
    return null;
  }
  
  return session.user;
}
