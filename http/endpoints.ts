import { $axios, fetchWithAuth } from "@/http/http.fn";
import type { RestaurantQueryParams } from "@/lib/types";


export const $api = {
  guest: {
    restaurant: {
      all: (params: RestaurantQueryParams) => {
        try {
          return $axios.get(`/restaurants`, {
            params: {
              page: params.page || 1,
              perPage: params.perPage || 20,
              ...(params.search && { search: params.search }),
              ...(params.category && { category: params.category }),
              ...(params.sort && { sort: params.sort }),
            }
          });
        } catch (error: any) {
          return error;
        }
      },

      filtersData: async () => {
        try {
          return $axios.get(`/restaurants/filters`);
        } catch (error: any) {
          return error;
        }
      },

      one: async (slug: string, params = {}) => {
        try {
          return $axios.get(`/restaurants/${slug}`, { params });
        } catch (error: any) {
          return error;
        }
      },
      /*		all: async () => {
				try {
					const res = await fetch(
						`${envData.base_url}/restaurant/all?page=1&perPage=10`,
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

    contact:async (body: any) => {
      try {
        return $axios.post(`/g/contact`, body);
      } catch (error: any) {
        return error;
      }
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

      account: {
        update: async (body: any) => {
          try {
            return $axios.patch(`/account`, body);
          } catch (error: any) {
            return error;
          }
        },
        update_name_email: async (body: any) => {
          try {
            return $axios.patch(`/account/update-email`, body);
          } catch (error: any) {
            return error;
          }
        },
        update_phone_number: async (body: any) => {
          try {
            return $axios.patch(`/account/update-phone-number`, body);
          } catch (error: any) {
            return error;
          }
        },
        verify_phone_number: async (body: any) => {
          try {
            return $axios.patch(`/account/verify-phone-number`, body);
          } catch (error: any) {
            return error;
          }
        },
        verifyEmailChange: async (body: any) => {
          try {
            return $axios.patch(`/account/verify-email-change`, body);
          } catch (error: any) {
            return error;
          }
        },
      },

      address: {
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
      },

      order: {
        restaurant: async (orderId: string, body: any) => {
          try {
            return $axios.post(`/orders/${orderId}/restaurant`, body);
          } catch (error: any) {
            return error;
          }
        },
        // API endpoint definition
        history: async (params?: {
          orderId?: string;
          page?: number;
          perPage?: number;
          sort?: "asc" | "desc";
          sortBy?: "createdAt" | "updatedAt" | "status" | "type";
        }) => {
          try {
            const queryParams = new URLSearchParams();

            if (params?.orderId) {
              queryParams.append("orderId", params.orderId);
            }
            if (params?.page) {
              queryParams.append("page", params.page.toString());
            }
            if (params?.perPage) {
              queryParams.append("perPage", params.perPage.toString());
            }
            if (params?.sort) {
              queryParams.append("sort", params.sort);
            }
            if (params?.sortBy) {
              queryParams.append("sortBy", params.sortBy);
            }

            const queryString = queryParams.toString();
            const url = `/orders${queryString ? `?${queryString}` : ""}`;

            return $axios.get(url);
          } catch (error: any) {
            return error;
          }
        },

        one: async (publicId: string) => {
          try {
            return $axios.get(`/orders/${publicId}`);
          } catch (error: any) {
            return error;
          }
        },

        package: async (body: any) => {
          try {
            return $axios.post(`/orders/package-delivery`, body);
          } catch (error: any) {
            return error;
          }
        },
      },
    },
  },

  payments: {
    card: async (body: any) => {
      try {
        return $axios.post(`/payments/card-payment`, body);
      } catch (error: any) {
        return error;
      }
    },
  },
};
