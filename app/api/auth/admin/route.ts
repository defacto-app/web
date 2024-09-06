import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { token } = await request.json();

        const response = NextResponse.json({ success: true });

        // Set the token as an HTTP-only cookie
        response.cookies.set('admin-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 7 days
        });

        return response;
    } catch (error: any) {
        console.error('Error setting cookie:', error);
        return new NextResponse(
            JSON.stringify({ error: 'Failed to set cookie' }),
            { status: 500 }
        );
    }
}
