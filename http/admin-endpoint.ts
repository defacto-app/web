import { $axios_admin } from "@/http/http-admin.fn";

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
};
