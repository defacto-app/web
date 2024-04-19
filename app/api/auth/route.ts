import env from "@/config/env";

export const dynamic = "force-dynamic"; // defaults to auto
export async function GET(request: Request) {
  console.log(env.BASE_URL);
  const url = "https://api.defactoapp.com.ng/api/admin/auth/login";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: "kats.com.ng@gmail.com",
      password: "123456",
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
