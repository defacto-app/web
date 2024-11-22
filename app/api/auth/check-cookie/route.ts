// /api/auth/check-cookie/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const cookieHeader = request.headers.get('cookie');
    const userToken = cookieHeader?.split(';')
        .find(c => c.trim().startsWith('user-token='))
        ?.split('=')[1];

    console.log('Cookie check:', {
        hasCookieHeader: !!cookieHeader,
        hasUserToken: !!userToken,
        // biome-ignore lint/style/useTemplate: <explanation>
        tokenPreview: userToken ? userToken.substring(0, 20) + '...' : 'none'
    });

    return NextResponse.json({
        cookiePresent: !!userToken,
        // biome-ignore lint/style/useTemplate: <explanation>
        cookieValue: userToken ? userToken.substring(0, 20) + '...' : null
    });
}