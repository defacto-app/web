import {cookies} from "next/headers";



export function isUserLoggedIn(): boolean {
    const cookieStore = cookies();
    const userToken = cookieStore.get('user-token');
    return !!userToken;
}

