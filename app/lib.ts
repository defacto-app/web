import { cookies } from "next/headers";
import env from "@/config/env";
import { NextRequest } from "next/server";

export async function logout() {
	// Destroy the session
	cookies().set("session", "", { expires: new Date(0) });
}

export async function authenticate(data: any) {
	// ping the server to check if the token is valid

	const result = await fetch(`${env.base_url}/admin/auth/ping`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${data}`,
		},
	});

	const _data = await result.json();

	if (_data.error) {
		return false;
	}

	if (_data.success) {
		return true;
	}
}

export async function authenticateUser(data: any) {
	// ping the server to check if the token is valid

	const result = await fetch(`${env.base_url}/auth/ping`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${data}`,
		},
	});

	const _data = await result.json();

	if (_data.error) {
		return false;
	}

	if (_data.success) {
		return true;
	}
}
