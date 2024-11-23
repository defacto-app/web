// auth.ts
import envData from "@/config/envData";

export const tokenConstants = {
	admin: "admin-token",
	user: "user-token",
};

export type TokenOptions = "admin" | "user";

// Get token from both localStorage and cookies
export function getToken(key: TokenOptions): string {
	try {
		// Check localStorage
		const localToken = localStorage.getItem(tokenConstants[key]);
		if (localToken) return localToken;

		// Check cookies
		const cookies = document.cookie.split(";");
		const cookieToken = cookies
			.find((c) => c.trim().startsWith(`${tokenConstants[key]}=`))
			?.split("=")[1];

		return cookieToken || "";
	} catch (error) {
		console.error("Failed to retrieve token:", error);
		return "";
	}
}

export function isUserLoggedIn(): boolean {
	return !!getToken("user");
}

// Set token in both localStorage and cookie
export function setToken(key: TokenOptions, token: string): void {
	try {
		// Set in localStorage
		localStorage.setItem(tokenConstants[key], token);

		// Set in cookie
		document.cookie = `${tokenConstants[key]}=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
	} catch (error) {
		console.error("Failed to set token:", error);
	}
}

// Clear token from both localStorage and cookie
export function clearToken(key: TokenOptions): void {
	try {
		// Clear from localStorage
		localStorage.removeItem(tokenConstants[key]);

		// Clear from cookie
		document.cookie = `${tokenConstants[key]}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
	} catch (error) {
		console.error("Failed to clear token:", error);
	}
}

// Verify token with backend
export async function verifyToken(token: string): Promise<boolean> {
	if (!token) return false;

	try {
		const response = await fetch(`${envData.base_url}/auth/ping`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const data = await response.json();

		return data.success === true;
	} catch (error) {
		console.error("💥 Token verification failed:", error);
		return false;
	}
}
