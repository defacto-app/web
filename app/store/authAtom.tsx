import { atom, useAtomValue, useSetAtom } from 'jotai';
import {useCallback, useEffect} from "react";
import { clearToken, isUserLoggedIn } from "@/utils/auth";
import {$api} from "@/http/endpoints";

// Define the steps
export const authSteps = ["welcome", "email", "phone", "success"] as const;
export type AuthStep = (typeof authSteps)[number];

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

export const currentStepAtom = atom<AuthStep>(authSteps[0]);

export const isLoggedInAtom = atom<boolean>(false);

export const modalOpenAtom = atom<boolean>(false);

export const authUserAtom = atom<authUserType>({
	firstName: "",
	email: "",
	phone: "",
});

// Define a derived atom to handle `goBack` function
export const goBackAtom = atom(
	null,
	(get, set) => {
		const currentStep = get(currentStepAtom);
		const currentIndex = authSteps.indexOf(currentStep);
		if (currentIndex > 0) {
			set(currentStepAtom, authSteps[currentIndex - 1]);
		}
	}
);

// Define a derived atom to handle `logOut` function
export const logOutAtom = atom(
	null,
	(get, set) => {
		clearToken("user");
		set(isLoggedInAtom, false);
		localStorage.setItem("isLoggedIn", JSON.stringify(false));
	}
);

// Create the hook to use the atoms in components
export const useAtomAuthContext = () => {
	// Read-only atom access
	const form = useAtomValue(formAtom);
	const currentStep = useAtomValue(currentStepAtom);
	const isLoggedIn = useAtomValue(isLoggedInAtom);
	const modalOpen = useAtomValue(modalOpenAtom);

	const authUser = useAtomValue(authUserAtom);

	// Setter atom access
	const setForm = useSetAtom(formAtom);
	const setCurrentStep = useSetAtom(currentStepAtom);
	const setIsLoggedIn = useSetAtom(isLoggedInAtom);
	const setModalOpen = useSetAtom(modalOpenAtom);
	const goBack = useSetAtom(goBackAtom);
	const logOut = useSetAtom(logOutAtom);
	const setAuthUser = useSetAtom(authUserAtom);

	// Define the getMe function
	const getMe = useCallback(async () => {
		try {
			const { data } = await $api.auth.user.me();
			setAuthUser(data.user);
		} catch (error) {
			console.error("Failed to fetch user data", error);
			// Handle error (e.g., log the user out or display a message)
		}
	}, [setAuthUser]);

	// Sync `isLoggedIn` with localStorage
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
		useEffect(() => {
		setIsLoggedIn(isUserLoggedIn());
	}, [setIsLoggedIn]);

	return {
		form,
		authUser,
		setForm,
		currentStep,
		setCurrentStep,
		goBack,
		isLoggedIn,
		logOut,
		setIsLoggedIn,
		modalOpen,
		setAuthUser,
		setModalOpen,
		getMe,
	};
};
