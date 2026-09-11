import { NextResponse, type NextRequest } from "next/server";
import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT } from "@/routes";

export function middleware(request: NextRequest) {
    const { nextUrl } = request;
    const sessionToken = request.cookies.get("better-auth.session_token")?.value || 
                         request.cookies.get("__Secure-better-auth.session_token")?.value;
    const isLoggedIn = !!sessionToken;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isDashboardRoute = nextUrl.pathname.startsWith("/dashboard");

    if (isApiAuthRoute) {
        return NextResponse.next();
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return NextResponse.next();
    }

    if (isDashboardRoute && !isLoggedIn) {
        const loginUrl = new URL("/auth/login", nextUrl);
        loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};