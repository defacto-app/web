import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { authenticate } from "@/app/lib";
import { tokenConstants, verifyToken } from "@/utils/auth";

export async function middleware(request: NextRequest) {

    // Handle Admin Authentication
    if (request.nextUrl.pathname.startsWith('/admin')) {
        const adminToken = request.cookies.get("admin-token");
        const isAuthenticatedAdmin = await authenticate(adminToken?.value);

        if (isAuthenticatedAdmin && !request.nextUrl.pathname.startsWith('/admin/x')) {
            return NextResponse.redirect(new URL('/admin/x', request.url));
        }

        if (!isAuthenticatedAdmin && !request.nextUrl.pathname.startsWith('/admin/auth')) {
            return NextResponse.redirect(new URL('/admin/auth', request.url));
        }
    }

    // Handle User Authentication
    if (request.nextUrl.pathname.startsWith('/user')) {
        const userToken = request.cookies.get(tokenConstants.user);


        if (!userToken?.value) {
            const loginUrl = new URL('/auth/login', request.url);
            loginUrl.searchParams.set('next', request.nextUrl.pathname);
            return NextResponse.redirect(loginUrl);
        }

        try {
            const isValid = await verifyToken(userToken.value);

            if (!isValid) {
                const loginUrl = new URL('/auth/login', request.url);
                loginUrl.searchParams.set('next', request.nextUrl.pathname);
                return NextResponse.redirect(loginUrl);
            }
        } catch (error) {
            const loginUrl = new URL('/auth/login', request.url);
            loginUrl.searchParams.set('next', request.nextUrl.pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/user/:path*'],
};