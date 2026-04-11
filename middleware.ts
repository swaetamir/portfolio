import { NextRequest, NextResponse } from "next/server";

const PASSWORD = process.env.SITE_PASSWORD ?? "changeme";

export function middleware(req: NextRequest) {
  if (process.env.NODE_ENV === "development") return NextResponse.next();

  const auth = req.headers.get("authorization");

  if (auth) {
    const [, encoded] = auth.split(" ");
    const decoded = Buffer.from(encoded, "base64").toString();
    const [, pass] = decoded.split(":");
    if (pass === PASSWORD) return NextResponse.next();
  }

  return new NextResponse("Unauthorized", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Site"' },
  });
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
