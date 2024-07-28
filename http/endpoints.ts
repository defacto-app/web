import env from "@/config/env";


export const $api = {
    guest: {
        restaurant: {
            all: async () => {
                try {
                    const res = await fetch('https://api.defactoapp.com.ng/api/v1/restaurant/all?page=1&perPage=10');
                    if (!res.ok) {
                        throw new Error('Failed to fetch data');
                    }
                    return res.json();
                } catch (error) {
                    console.log(error);
                    throw error; // Re-throw the error to handle it outside if needed
                }
            },
        },
    },

    auth:{
        admin:{
            sendEmailOtp: async (body: any) => {
                try {
                    const res = await fetch('https://api.defactoapp.com.ng/api/v1/auth/admin-login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(body),
                    });

                    if (!res.ok) {
                        return res.json();
                    }

                    return await res.json();
                } catch (error:any) {
                    return error;
                }
            }
        },
        user:{
            phone_login: async (body: any) => {
                try {
                    const res = await fetch(`${env.base_url}/auth/confirm-phone-login`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(body),
                    });

                    if (!res.ok) {
                        return res.json();
                    }

                    return await res.json();
                } catch (error:any) {
                    return error;
                }
            }
        }
    }
};




