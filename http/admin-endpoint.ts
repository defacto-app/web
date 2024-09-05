import { $axios } from "@/http/http-admin.fn";

export const $admin_api = {
	auth: {
		admin: {
			sendEmailOtp: async (body: any) => {
				try {
					return $axios.post(`/auth/send-otp `, body);
				} catch (error: any) {
					return error;
				}
			},
			login: async (body: any) => {
				try {
					return $axios.post(`/auth/login`, body);
				} catch (error: any) {
					return error;
				}
			},
		},

		ping: async () => {
			try {
				return $axios.get(`/auth/ping`);
			} catch (error: any) {
				return error;
			}
		},
	},
};
