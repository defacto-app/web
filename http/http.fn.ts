import axios from "axios";
import { getToken} from "@/utils/auth";
import envData from "@/config/envData";


const $axios = axios.create({
	baseURL: envData.base_url,
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
		console.log(error, "401 error");
		return Promise.reject(error);
	},
);

$axios.interceptors.response.use(
	(response) => {
		return response.data; // Extract and return the data from the response
	},
	(error) => {
		console.log(error, "401 error");
	/*	if (error.response?.status === 401) {
			clearToken("user");
			window.location.href = "/login";
		}*/
		return Promise.reject(error.response ? error.response.data : error);
	}
);



// Helper for GET requests with auth
const fetchWithAuth = async (url: string, params: any = {}, cacheOption: RequestCache = 'no-cache') => {
	const token = getToken("user");

	// Construct query string from params
	const queryString = new URLSearchParams(params).toString();
	const fullUrl = queryString ? `${envData.base_url}${url}?${queryString}` : `${envData.base_url}${url}`;

	const response = await fetch(fullUrl, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`,
		},
		cache: cacheOption, // Use the cache argument here
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message || "Failed to fetch data");
	}

	return response.json();
};






export { $axios, fetchWithAuth };
