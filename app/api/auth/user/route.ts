import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { token } = await request.json();

    const response = NextResponse.json({ success: true });

    // Set the cookie in the response
    response.cookies.set({
        name: 'user-token',
        value: token,
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
    });

    console.log('Setting cookie in response:', {
        // biome-ignore lint/style/useTemplate: <explanation>
        token: token.substring(0, 20) + '...',
        cookieSet: !!response.cookies.get('user-token')
    });

    return response;
}