import axios from "axios";
import { getToken } from "@/utils/auth";
import env from "@/config/env";


const $axios = axios.create({
	baseURL: env.base_url,
});

$axios.interceptors.request.use(
	async (config) => {
		const token = getToken("user");

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

$axios.interceptors.response.use(
	(response) => {
		return response.data; // Extract and return the data from the response
	},
	(error) => {
		return Promise.reject(error.response ? error.response.data : error);
	}
);



export { $axios };
