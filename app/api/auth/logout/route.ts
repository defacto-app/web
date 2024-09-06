import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
    // Clear the admin-token and user-token cookies
    const response = NextResponse.json({ message: 'Logged out successfully' });

    // Expire the cookies by setting them with an empty value and short maxAge
    response.cookies.set('admin-token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        expires: new Date(0), // Expire immediately
    });

    response.cookies.set('user-token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        expires: new Date(0), // Expire immediately
    });

    return response;
}
