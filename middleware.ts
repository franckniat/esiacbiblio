import {publicRoutes, apiAuthPrefix, DEFAULT_LOGIN_REDIRECT, authRoutes, protectedRoutes} from "@/routes";
import { auth } from '@/auth';
 
export default auth((req)=>{
  const {nextUrl} = req;
  const isLogged = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname);
  if(isApiAuthRoute){
    return;
  }
  if(isAuthRoute){
    if(isLogged){
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return;
  }
  if(isProtectedRoute){
    if(!isLogged){
      return Response.redirect(new URL("/auth/login", nextUrl));
    }
  }
  if(!isPublicRoute && !isLogged){
    return Response.redirect(new URL("/auth/login", nextUrl))
  }
  return;
})
 
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image||.*\\.png$).*)'],
};