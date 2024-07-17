import axios from "axios";
import { getToken } from "@/utils/IsDev";
const baseUrl = "https://api.defactoapp.com.ng/api/v1";

//

const $axios = axios.create({
	baseURL: baseUrl,
});

$axios.interceptors.request.use(
	async (config) => {
		const token = getToken("user");

		if (token) {
			config.headers.Authorization = token;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

export { $axios };
