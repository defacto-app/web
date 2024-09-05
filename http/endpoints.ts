import { $axios } from "@/http/http.fn";
import env from "@/config/env";

export const $api = {
	guest: {
		restaurant: {
			all: async () => {
				try {
					const res = await fetch(
						`${env.base_url}/restaurant/all?page=1&perPage=10`,
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
		location: {
			autocomplete: async (input: any) => {
				try {
					return $axios.get(`/g/google-places`, {
						params: { input },
					});
				} catch (error: any) {
					return error;
				}
			},

			details: async (place_id: any) => {
				try {
					return $axios.get(`/g/place-details`, {
						params: { place_id },
					});
				} catch (error: any) {
					return error;
				}
			},
			reverse_geocode: async (lat: any, lng: any) => {
				try {
					return $axios.get(`/g/reverse-geocode`, {
						params: { lat, lng },
					});
				} catch (error: any) {
					return error;
				}
			},
		},
	},

	auth: {

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
			email_exists: async (body: any) => {
				try {
					return $axios.post(`/auth/email-exists`, body);
				} catch (error: any) {
					return error;
				}
			},
			email_login: async (body: any) => {
				try {
					return $axios.post(`/auth/email-login`, body);
				} catch (error: any) {
					return error;
				}
			},
			email_register: async (body: any) => {
				try {
					return $axios.post(`/auth/email-register`, body);
				} catch (error: any) {
					return error;
				}
			},

			me: async () => {
				try {
					return $axios.get(`/auth/ping`);
				} catch (error: any) {
					return error;
				}
			},
		},
	},
};


