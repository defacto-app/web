import { cookies } from "next/headers";
import envData from "@/config/envData";

export async function logout() {
	// Destroy the session
	cookies().set("session", "", { expires: new Date(0) });
}



export async function authenticateUser(data: any) {
	if (!data) {
		console.log('No token provided to authenticateUser');
		return false;
	}

	try {
		// biome-ignore lint/style/useTemplate: <explanation>
		console.log('Making ping request with token:', data.substring(0, 20) + '...');

		const result = await fetch(`${envData.base_url}/auth/ping`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${data}`,
			},
		});

		const _data = await result.json();
		console.log('Ping response:', _data);

		if (_data.error) {
			console.log('Ping returned error:', _data.error);
			return false;
		}

		if (_data.success) {
			console.log('Ping successful');
			return true;
		}

		console.log('Unexpected ping response');
		return false;
	} catch (error) {
		console.error('Error during ping:', error);
		return false;
	}
}
