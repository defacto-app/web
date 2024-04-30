export async function POST() {
   /* const res = await fetch('http://localhost:5700/api/auth/admin-login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'API-Key': process.env.DATA_API_KEY!,
        },
        body: JSON.stringify({ time: new Date().toISOString() }),
    })

    const data = await res.json()*/
    //
    // return Response.json(data)

    console.log("checking post")

    return new Response("Hello Woraaaald")

}

