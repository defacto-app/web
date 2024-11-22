import { NextResponse } from 'next/server';
import { authenticateUser } from "@/app/lib";  // use your existing auth function

export async function GET(request: Request) {
    const cookies = request.headers.get('cookie') || '';
    const userToken = cookies.split('; ').find(row => row.startsWith('user-token='))?.split('=')[1];

    const isAuthenticated = await authenticateUser(userToken);

    if (isAuthenticated) {
        return NextResponse.json({ authenticated: true });
    }

    return NextResponse.json({ authenticated: false }, { status: 401 });
}