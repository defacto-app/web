import { atom, useAtomValue, useSetAtom } from "jotai";
import { useCallback, useEffect } from "react";
import { clearToken, isUserLoggedIn } from "@/utils/auth";
import { $api } from "@/http/endpoints";

// Define the steps
export const authSteps = [
	"welcome",
	"email",
	"phone",
	"login-success",
	"registration-success",
] as const;
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
	phoneNumber: string;
	address: string;
	verificationStatus: {
		isEmailVerified: boolean;
		isPhoneVerified: boolean;
	};
};

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
	phoneNumber: "",
	address: "",
	verificationStatus: {
		isEmailVerified: false,
		isPhoneVerified: false,
	},
});

// Define a derived atom to handle `goBack` function
export const goBackAtom = atom(null, (get, set) => {
	const currentStep = get(currentStepAtom);
	const currentIndex = authSteps.indexOf(currentStep);
	if (currentIndex > 0) {
		set(currentStepAtom, authSteps[currentIndex - 1]);
	}
});

export const logOutAtom = atom(null, async (get, set) => {
	clearToken("user");
	set(isLoggedInAtom, false);
	set(authUserAtom, {
		firstName: "",
		email: "",
		phoneNumber: "",
		address: "",
		verificationStatus: {
			isEmailVerified: false,
			isPhoneVerified: false,
		},
	}); // Reset user data
	localStorage.setItem("isLoggedIn", JSON.stringify(false));
	set(currentStepAtom, authSteps[0]); // Optionally reset the step to "welcome"
	set(modalOpenAtom, false); // Close any open modals
	await fetch(`/api/auth/logout`);
});

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
			setIsLoggedIn(false);
			logOut();
			clearToken("user");
			const loggedIn = isUserLoggedIn();
			console.log("ping failed", loggedIn);

			// Handle error (e.g., log the user out or display a message)
		}
	}, [setAuthUser, logOut, setIsLoggedIn]);

	useEffect(() => {
		const loggedIn = isUserLoggedIn();
		if (!loggedIn && isLoggedIn) {
			logOut(); // Immediately log out if there's an inconsistency
		}
		setIsLoggedIn(loggedIn);
	}, [setIsLoggedIn, logOut, isLoggedIn]);

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
