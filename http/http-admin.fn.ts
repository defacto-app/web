import axios from "axios";
import { getToken } from "@/utils/auth";
import env from "@/config/env";


const $axios_admin = axios.create({
	baseURL: `${env.base_url}/admin`,
});

$axios_admin.interceptors.request.use(
	async (config) => {
		const token = getToken("admin");

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

$axios_admin.interceptors.response.use(
	(response) => {
		return response.data.data; // Extract and return the data from the response
	},
	(error) => {
		return Promise.reject(error.response ? error.response.data : error);
	}
);



export { $axios_admin };
