export const isDev = process.env.NODE_ENV === "development";

const env = {
	base_url: process.env.NEXT_PUBLIC_BASE_URL || "",
	isDev: isDev,
	user_email: process.env.NEXT_PUBLIC_USER_EMAIL || "",
	user_password: process.env.NEXT_PUBLIC_USER_PASSWORD || "",
	flutterwave_public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY || "",
	google_client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
	lat: process.env.NEXT_PUBLIC_LAT || "",
	lng: process.env.NEXT_PUBLIC_LON || "",
	google_map_api:process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
};

export default env;
