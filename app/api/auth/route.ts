import env from "@/config/env";

export const dynamic = "force-dynamic"; // defaults to auto
export async function POST(request: Request) {

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
}
export const runtime = 'edge';