import env from "@/config/env";
import {cookies} from 'next/headers'
import {de} from "@faker-js/faker";

export const dynamic = "force-dynamic"; // defaults to auto

export async function POST(request: any) {
    try {
        const body = await request.json();


        const url = `${env.base_url}/auth/email-login`;
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        };

        const res = await fetch(url, options);

        // Check if the response was not successful
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();

        // Assuming you have a function cookies() that sets cookies
        const token = data.data.token;

        cookies().set({
            name: 'user-token',
            value: token,
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
            path: '/',
            secure: true,
        });

        // The cookie string seems unused, remove if not needed, or ensure it's being utilized correctly
        // const cookie = `token=${token}; path=/; HttpOnly; Secure; SameSite=None`;

        return new Response(JSON.stringify({ data }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error:any) {
        // Log the error or handle it as needed
        console.error('Error:', error.message);

        return new Response(JSON.stringify({
            error: 'Failed to process the request',
            details: error.message
        }), {
            status: 500, // Internal Server Error
            headers: { 'Content-Type': 'application/json' }
        });
    }
}


export const runtime = "edge";
