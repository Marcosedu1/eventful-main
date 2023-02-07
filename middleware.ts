import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get("@eventful:access_token");

  if (
    request.nextUrl.pathname.startsWith("/usuario/login") ||
    request.nextUrl.pathname.startsWith("/usuario/cadastro")
  ) {
    if (authCookie) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/organize")) {
    if (!authCookie) {
      const newUrl = request.nextUrl.clone();
      newUrl.searchParams.set("return_url",encodeURIComponent(request.nextUrl.href));
      newUrl.pathname = "/usuario/login";
      return NextResponse.rewrite(newUrl);
    }
  }

  return NextResponse.next();
}
