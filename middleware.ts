import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { authenticate } from "@/app/lib";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const authToken = request.cookies.get("admin-token");
    const userToken = request.cookies.get("user-token");

    console.log(authToken?.value, "authToken");
    console.log(userToken?.value, "userToken");

    const isAuthenticatedAdmin = await authenticate(authToken?.value);
    const isAuthenticatedUser = await authenticate(userToken?.value);
    const url = request.nextUrl.clone();

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
        if (isAuthenticatedUser && !request.nextUrl.pathname.startsWith('/user/dashboard')) {
            return NextResponse.redirect(new URL('/user/dashboard', request.url));
        }

        if (!isAuthenticatedUser && !request.nextUrl.pathname.startsWith('/user/login')) {
            return NextResponse.redirect(new URL('/user/login', request.url));
        }
    }

    // Proceed if no redirects are required
    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/user/:path*'],
};
