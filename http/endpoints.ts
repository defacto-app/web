import { $axios, fetchWithAuth } from "@/http/http.fn";
import env from "@/config/env";
import { $axios_admin } from "@/http/http-admin.fn";

export const $api = {
	guest: {
		restaurant: {
			all: async ({ page = 1, perPage = 20, searchTerm = "" }) => {
				try {
					return $axios.get(`/restaurants`, {
						params: { page, perPage, search: searchTerm },
					});
				} catch (error: any) {
					return error;
				}
			},

			one: async (slug: string) => {
				try {
					return $axios.get(`/restaurants/${slug}`, {});
				} catch (error: any) {
					return error;
				}
			},

			/*		all: async () => {
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
			},*/
			/*	all: async ({ page = 1, perPage = 20, searchTerm = "" }) => {
				try {
					return $axios_admin.get(`/restaurants`, {
						params: { page, perPage, search: searchTerm },
					});
				} catch (error: any) {
					return error;
				}
			},*/
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
					return await fetchWithAuth("/auth/ping", {}, "no-cache");
				} catch (error: any) {
					console.error(error);
					throw error; // You can re-throw it or handle it differently
				}
			},

			address:{
				all: async () => {
					try {
						return $axios.get(`/address`);
					} catch (error: any) {
						return error;
					}
				},

				create: async (body: any) => {
					try {
						return $axios.post(`/auth/address`, body);
					} catch (error: any) {
						return error;
					}
				},

				delete: async (id: string) => {
					try {
						return $axios.delete(`/auth/address/${id}`);
					} catch (error: any) {
						return error;
					}
				},
			}
		},
	},

	payments:{
		card: async (body: any) => {
			try {
				return $axios.post(`/payments/card-payment`, body);
			} catch (error: any) {
				return error;
			}
		},
	},
};
