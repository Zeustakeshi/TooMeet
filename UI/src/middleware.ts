import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { authPages, publicPages, routeValidate } from "./routes";

export function middleware(request: NextRequest) {
    const { nextUrl } = request;
    const pathname = nextUrl.pathname;
    const isPublicPage = routeValidate(pathname, publicPages);
    const isAuthPage = routeValidate(pathname, authPages);
    const isLoggedIn = !!request.cookies.has("access_token");

    console.log("===================================================");
    console.log({
        pathname,
        isAuthPage,
        isPublicPage,
        isLoggedIn,
    });
    console.log("===================================================");

    if (isAuthPage) {
        if (isLoggedIn) {
            return Response.redirect(new URL("/", nextUrl));
        }
        return null;
    }

    if (isPublicPage) return null;

    if (!isLoggedIn) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }
}

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
