import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'


// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

    const authToken = request.cookies.get("auth-token")

    // const isAuthenticated = authenticate(request)
    // If the user is authenticated, continue as normal
    if (authToken) {
        return NextResponse.next()
    }

    // If the user is not authenticated, redirect to log in

    const url = request.nextUrl.clone()
    url.pathname = '/admin/auth/'
    return NextResponse.rewrite(url)


    // const  isLoggedIn = true

    // set authorization  headers


}

export const config = {
    matcher: '/admin/:path*',
}


// See "Matching Paths" below to learn more
