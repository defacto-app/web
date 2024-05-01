import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'
import {authenticate} from "@/app/lib";


// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

    const authToken = request.cookies.get("auth-token")

    const isAuthenticated = await authenticate(authToken?.value)
    const url = request.nextUrl.clone()


    if (isAuthenticated) {
        // add the token to the request headers

        request.headers.set("authorization", `Bearer ${authToken?.value}`)
        return NextResponse.next()
    }

    // If the user is not authenticated, redirect to log in

    url.pathname = '/admin/auth/'
    return NextResponse.rewrite(url)


}

export const config = {
    matcher: '/admin/:path*',
}


// See "Matching Paths" below to learn more
