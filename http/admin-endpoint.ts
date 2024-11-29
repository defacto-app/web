import { $axios_admin } from "@/http/http-admin.fn";

interface MenuQueryParams {
	page?: number;
	perPage?: number;
	search?: string;
	category?: string;
	isAvailable?: boolean;
}

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

	dashboard: async () => {
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
					params: { page, perPage, search: searchTerm },
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

		getMenu: async (id: string, params?: MenuQueryParams) => {
			try {
				const response = await $axios_admin.get(`/restaurants/menu/${id}`, {
					params: {
						page: params?.page || 1,
						perPage: params?.perPage || 10,
						search: params?.search,
						category: params?.category,
						isAvailable: params?.isAvailable,
					},
				});

				return response;
			} catch (error: any) {
				return error;
			}
		},

		allMenus: async ({ page = 1, perPage = 20, searchTerm = "" }) => {
			try {
				return $axios_admin.get(`/menu`, {
					params: { page, perPage, search: searchTerm },
				});
			} catch (error: any) {
				return error;
			}
		},

		categories: async ({
			page = 1,
			perPage = 20,
			searchTerm = "",
			sorting = null,
		}: {
			page: number;
			perPage: number;
			searchTerm?: string;
			sorting?: { field: string; direction: "asc" | "desc" } | null;
		}) => {
			try {
				return $axios_admin.get(`/restaurants/categories`, {
					params: {
						page,
						perPage,
						search: searchTerm,
						sortBy: sorting?.field,
						sortOrder: sorting?.direction,
					},
				});
			} catch (error: any) {
				return error;
			}
		},
		deleteCategory: async (id: string) => {
			try {
				return $axios_admin.delete(`/restaurants/categories/${id}`);
			} catch (error: any) {
				return error;
			}
		},
	},

	users: {
		all: async ({ page = 1, perPage = 20, searchTerm = "", role = "" }) => {
			try {
				return $axios_admin.get(`/users`, {
					params: { page, perPage, search: searchTerm, role },
				});
			} catch (error: any) {
				return error;
			}
		},

		create: async (body: any) => {
			try {
				return $axios_admin.post(`/users`, body);
			} catch (error: any) {
				return error;
			}
		},

		delete: async (userId: string) => {
			try {
				return $axios_admin.delete(`/users/${userId}`);
			} catch (error: any) {
				return error;
			}
		},
		/*	one: async (id: string) => {
			try {
				return $axios_admin.get(`/users/${id}`);
			} catch (error: any) {
				return error;
			}
		},
		update: async (id: string, body: any) => {
			try {
				return $axios_admin.put(`/users/${id}`, body);
			} catch (error: any) {
				return error;
			}
		},
		*/
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

		toggleAvailability: async (id: string, body: any) => {
			try {

				return $axios_admin.patch(`/menu/${id}/toggle-availability`, body);
			} catch (error: any) {
				return error;
			}
		},

		delete: async (id: string) => {
			try {
				return $axios_admin.delete(`/menu/${id}`);
			} catch (error: any) {
				return error;
			}
		},

		create: async (id: string, body: any) => {
			try {
				return $axios_admin.post(`/restaurants/menu/${id}`, body);
			} catch (error: any) {
				return error;
			}
		},
		image: async (id: string, body: any) => {
			try {
				return $axios_admin.post(`/menu/${id}`, body);
			} catch (error: any) {
				return error;
			}
		},
	},

	orders: {
		one: async (orderId: string) => {
			try {
				return $axios_admin.get(`/orders/${orderId}`);
			} catch (error: any) {
				return error;
			}
		},
		all: async ({ page = 1, perPage = 20, searchTerm = "", type = "" }) => {
			try {
				return $axios_admin.get(`/orders`, {
					params: {
						page,
						perPage,
						search: searchTerm,
						type, // Add the type parameter to filter by order type
					},
				});
			} catch (error: any) {
				return error;
			}
		},
		delete: async (publicId: string) => {
			try {
				return $axios_admin.delete(`/order/${publicId}`);
			} catch (error: any) {
				return error;
			}
		},

		updateStatus: async (orderId: string, status: string) => {
			try {
				return $axios_admin.patch(`/orders/${orderId}/status`, { status });
			} catch (error: any) {
				return error;
			}
		},

		update: async (orderId: string, body: any) => {
			try {
				return $axios_admin.put(`/orders/${orderId}`, body);
			} catch (error: any) {
				return error;
			}
		}
	},

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
