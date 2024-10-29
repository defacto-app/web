export const isDev = process.env.NODE_ENV === "development";

const envData = {
	base_url: process.env.NEXT_PUBLIC_BASE_URL || "",
	isDev: isDev,
	logo:"https://res.cloudinary.com/dqwfjxn8g/image/upload/v1729003236/defacto/logo.png",
	user_email: process.env.NEXT_PUBLIC_USER_EMAIL || "",
	user_password: process.env.NEXT_PUBLIC_USER_PASSWORD || "",
	flutterwave_public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY || "",
	google_client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
	lat: process.env.NEXT_PUBLIC_LAT || "",
	lng: process.env.NEXT_PUBLIC_LON || "",
	google_map_api: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",

	flutter_wave: {
		test: {
			public_key: "FLWPUBK_TEST-02b9b5fc6406bd4a41c3ff141cc45e93-X",
			secret_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_SECRET_KEY || "",
		},
	},
};

export default envData;
