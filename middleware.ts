import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'
import {authenticate} from "@/app/lib";


// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

    const authToken = request.cookies.get("auth-token")

    console.log(authToken?.value, "authToken")

    const isAuthenticated = await authenticate(authToken?.value)
    const url = request.nextUrl.clone()


    if (isAuthenticated && !request.nextUrl.pathname.startsWith('/admin/x')) {
        return Response.redirect(new URL('/admin/x', request.url))
    }

    if (!isAuthenticated && !request.nextUrl.pathname.startsWith('/admin/auth')) {
        return Response.redirect(new URL('/admin/auth', request.url))
    }


}

export const config = {
    matcher: '/admin/:path*',
}


// See "Matching Paths" below to learn more
