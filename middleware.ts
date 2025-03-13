import { authConfig } from "@/auth.config";
import NextAuth from "next-auth";
import {apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, protectedRoutes, adminRoutes} from "@/routes"

const { auth } = NextAuth(authConfig)

export default auth(async function middleware(req){
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    const userRole = req.auth?.user?.role;
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname);
    const isAdminRoute = adminRoutes.includes(nextUrl.pathname);
    if (isApiAuthRoute) {
        return;
    }
    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return;
    }

    if (!isLoggedIn && isProtectedRoute) {
        return Response.redirect(new URL("/auth/login", nextUrl));
    }
    if (isLoggedIn && userRole !== "admin" && isAdminRoute) {
        return Response.redirect(new URL("/dashboard", nextUrl));
    }
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}