import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import {authenticate, authenticateUser} from "@/app/lib";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const adminToken = request.cookies.get("admin-token");
    const userToken = request.cookies.get("user-token");



    const isAuthenticatedAdmin = await authenticate(adminToken?.value);
    const isAuthenticatedUser = await authenticateUser(userToken?.value);

    // Handle Admin Authentication
    if (request.nextUrl.pathname.startsWith('/admin')) {
        if (isAuthenticatedAdmin && !request.nextUrl.pathname.startsWith('/admin/x')) {
            return NextResponse.redirect(new URL('/admin/x', request.url));
        }

        if (!isAuthenticatedAdmin && !request.nextUrl.pathname.startsWith('/admin/auth')) {
            return NextResponse.redirect(new URL('/admin/auth', request.url));
        }
    }

    // Handle User Authentication
    if (request.nextUrl.pathname.startsWith('/user')) {


        // If user is not authenticated, redirect to the home page
        if (!isAuthenticatedUser) {
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }
    }

    // Proceed if no redirects are required
    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/user/:path*'],
};
