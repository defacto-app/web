import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    let isLoggedIn = true
    // let isLoggedIn = request.cookies.get("loggedin")

    let url = request.url

    if (url === '/admin/auth') {
        return NextResponse.next();
    }

    if (!isLoggedIn && url.includes("/admin")) {
        return NextResponse.redirect(new URL('/', request.url))
    }

}

export const config = {
    matcher: '/admin/:path*',
}


// See "Matching Paths" below to learn more
