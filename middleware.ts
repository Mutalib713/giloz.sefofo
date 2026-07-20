import { NextResponse, type NextRequest } from "next/server";

/**
 * HTTP Basic Auth for the /admin dashboard.
 *
 * The admin board is the only surface that shows back-of-house data (live
 * orders, revenue, every dish across both kitchens), so it sits behind a
 * username + password prompt. Visiting /admin pops the browser's native login
 * dialog; the correct credentials unlock it for the session.
 *
 * Defaults are `admin` / `admin123`. Because this repo is public, override them
 * in production via the environment variables ADMIN_USER / ADMIN_PASSWORD
 * (Vercel → Project → Settings → Environment Variables) so the real password
 * never lives in committed source.
 */
const ADMIN_USER = process.env.ADMIN_USER ?? "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "admin123";

export function middleware(request: NextRequest) {
  const auth = request.headers.get("authorization");

  if (auth?.startsWith("Basic ")) {
    // "Basic <base64(user:pass)>" — decode, then split on the FIRST colon only,
    // since a password may itself contain colons.
    const [user, ...rest] = atob(auth.slice(6)).split(":");
    const pass = rest.join(":");
    if (user === ADMIN_USER && pass === ADMIN_PASSWORD) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Admin", charset="UTF-8"' },
  });
}

export const config = {
  // Only guard the admin dashboard; everything else stays public.
  matcher: ["/admin", "/admin/:path*"],
};
