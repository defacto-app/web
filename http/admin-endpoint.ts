import { $axios_admin } from "@/http/http-admin.fn";
import {$axios} from "@/http/http.fn";

export const $admin_api = {
	auth: {
		sendEmailOtp: async (body: any) => {
			try {
				return $axios_admin.post(`/auth/send-otp `, body);
			} catch (error: any) {
				return error;
			}
		},
		login: async (body: any) => {
			try {
				return $axios_admin.post(`/auth/login`, body);
			} catch (error: any) {
				return error;
			}
		},

		ping: async () => {
			try {
				return $axios_admin.get(`/auth/ping`);
			} catch (error: any) {
				return error;
			}
		},
	},

	dashboard:  async () => {
			try {
				return $axios_admin.get(`/dashboard`);
			} catch (error: any) {
				return error;
			}
	},

	restaurants: {
		all: async ({ page = 1, perPage = 20, searchTerm = "" }) => {
			try {
				return $axios_admin.get(`/restaurants`, {
					params: { page, perPage, search: searchTerm }
				});
			} catch (error: any) {
				return error;
			}
		},

		one: async (id: string) => {
			try {
				return $axios_admin.get(`/restaurants/${id}`);
			} catch (error: any) {
				return error;
			}
		},
		create: async (body: any) => {
			try {
				return $axios_admin.post(`/restaurants`, body);
			} catch (error: any) {
				return error;
			}
		},
		update: async (id: string, body: any) => {
			try {
				return $axios_admin.put(`/restaurants/${id}`, body);
			} catch (error: any) {
				return error;
			}
		},
		delete: async (id: string) => {
			try {
				return $axios_admin.delete(`/restaurants/${id}`);
			} catch (error: any) {
				return error;
			}
		},
		image: async (id: string, body: any) => {
			try {
				return $axios_admin.post(`/restaurants/${id}`, body);
			} catch (error: any) {
				return error;
			}
		},


		menu: async (id: string) => {
			try {
				return $axios_admin.get(`/restaurants/menu/${id}`);
			} catch (error: any) {
				return error;
			}
		},
	},

	menu: {
		one: async (id: string) => {
			try {
				return $axios_admin.get(`/menu/${id}`);
			} catch (error: any) {
				return error;
			}
		},

		update: async (id: string, body: any) => {
			try {
				return $axios_admin.put(`/menu/${id}`, body);
			} catch (error: any) {
				return error;
			}
		},



		create: async (id: string, body: any) => {},

	}

/*	upload:{
		image: async (id: string, body: any) => {
			try {
				return $axios_admin.post(`/restaurants/${id}`, body);
			} catch (error: any) {
				return error;
			}
		},
	}*/
};
