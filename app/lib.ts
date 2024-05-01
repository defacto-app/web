import {cookies} from "next/headers";
import {NextRequest, NextResponse} from "next/server";
import env from "@/config/env";


export async function logout() {
    // Destroy the session
    cookies().set("session", "", {expires: new Date(0)});
}


export async function authenticate(data: any) {


    // ping the server to check if the token is valid

    const result = await fetch(`${env.BASE_URL}/auth/admin-ping`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${data}`
        },

    })


    console.log("checking auth url")

    const _data = await result.json()

    console.log(_data, "checking result")

    if (_data.error) {
        return false
    }

    if (_data.success) {
        return true
    }


}

