import env from "@/config/env";
import {cookies} from 'next/headers'

export const dynamic = "force-dynamic"; // defaults to auto
/*export async function POST(request: Request) {
  const body = await request.json();
  console.log(body, "chekcing body");
  const url = `${env.base_url}/admin/auth/login`;
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

export async function GET(request: Request) {

    console.log("logout use- serr")

    const url = `${env.base_url}/auth/admin-login`;
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    };

    const res = await fetch(url, options);
    const data = await res.json();

    // save toke to cookie

    // reset       token log out user

    cookies().set('auth-token', '', {secure: true})


    return Response.json({data});
}

export const runtime = "edge";
