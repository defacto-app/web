import {$axios} from "@/http/http.fn";

export const $api = {
	guest: {
		restaurant: {
			all: async () => {
				try {
					const res = await fetch(
						"https://api.defactoapp.com.ng/api/v1/restaurant/all?page=1&perPage=10",
					);
					if (!res.ok) {
						throw new Error("Failed to fetch data");
					}
					return res.json();
				} catch (error) {
					console.log(error);
					throw error; // Re-throw the error to handle it outside if needed
				}
			},
		},
	},

	auth: {
		admin: {
			sendEmailOtp: async (body: any) => {
				try {
					const res = await fetch(
						"https://api.defactoapp.com.ng/api/v1/auth/admin-login",
						{
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify(body),
						},
					);

					if (!res.ok) {
						return res.json();
					}

					return await res.json();
				} catch (error: any) {
					return error;
				}
			},
		},
		user: {
			confirm_phone_login: async (body: any) => {
				try {
					return $axios.post(`/auth/confirm-phone-login`, body);
				} catch (error: any) {
					return error;
				}
			},
			phone_login: async (body: any) => {
				try {
					return $axios.post(`/auth/phone-login`, body);
				} catch (error: any) {
					return error;
				}
			},
		},
	},
};
