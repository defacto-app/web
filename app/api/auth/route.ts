import env from "@/config/env";
import {cookies} from 'next/headers'

export const dynamic = "force-dynamic"; // defaults to auto
/*export async function POST(request: Request) {
  const body = await request.json();
  console.log(body, "chekcing body");
  const url = `${env.BASE_URL}/admin/auth/login`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: body.email,
      password: body.password,
    }),
  };

  const res = await fetch(url, options);
  const data = await res.json();

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}*/

/* {
  message: 'Admin logged in',
  success: true,
  timeStamp: '2024-04-30T23:47:24.434Z',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MzE0YmE0YzU0NGM2OTQyMDcxMjAwNCIsImlhdCI6MTcxNDUyMDg0NCwiZXhwIjoxNzE0NTM4ODQ0fQ.rGZ_NhIi7qqupVdvWDkGh5SXCryqGxvq2qkcGSa_mD4'
}  */

type ResponseType = {
    message: string;
    success: boolean;
    timeStamp: string;
    token: string;

}

export async function POST(request: { json: () => any; }) {
    try {
        const body = await request.json();

        const url = `${env.BASE_URL}/auth/admin-login`;
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
        const token = data.token;
        cookies().set('auth-token', token, { secure: true });

        cookies().set({
            name: 'auth-token',
            value: token,
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
            path: '/',
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
