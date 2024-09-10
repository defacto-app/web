import { atom, useAtomValue, useSetAtom } from 'jotai';
import {useCallback, useEffect} from "react";

import {$admin_api} from "@/http/admin-endpoint";

// Define the steps

// Define the form type
type registerFormType = {
	email: string;
	password: string;
	phoneNumber?: string;
};

type authUserType = {
	firstName: string;
	email: string;
	phone: string;
}

// Atoms for global state management using Jotai
export const formAtom = atom<registerFormType>({
	email: "",
	password: "",
	phoneNumber: "",
});


export const isLoggedInAtom = atom<boolean>(false);


export const authUserAtom = atom<authUserType>({
	firstName: "",
	email: "",
	phone: "",
});





// Create the hook to use the atoms in components
export const useAtomAuthContext = () => {
	// Read-only atom access
	const form = useAtomValue(formAtom);
	const isLoggedIn = useAtomValue(isLoggedInAtom);

	const authUser = useAtomValue(authUserAtom);

	// Setter atom access
	const setForm = useSetAtom(formAtom);
	const setAuthUser = useSetAtom(authUserAtom);

	// Define the getMe function
	const getMe = useCallback(async () => {
		try {
			const response = await $admin_api.auth.ping();

			setAuthUser(response.data.data.user);

		} catch (error) {
			console.error("Failed to fetch user data", error);
			// Handle error (e.g., log the user out or display a message)
		}
	}, [setAuthUser]);



	return {
		form,
		authUser,
		setForm,
		isLoggedIn,

		setAuthUser,
		getMe,
	};
};
