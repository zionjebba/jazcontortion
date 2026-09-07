import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Validates admin session for API routes, returns 401/403 if unauthorized
export async function requireAdminApi() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return { errorResponse: NextResponse.json({ error: "Unauthorized" }, { status: 401 }), session: null };
  }

  if (session.user.role !== "ADMIN") {
    return { errorResponse: NextResponse.json({ error: "Forbidden" }, { status: 403 }), session: null };
  }

  return { errorResponse: null, session };
}
