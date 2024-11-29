import type React from "react";
import {useEffect} from "react";
import { useState, createContext, useContext, type ReactNode } from "react";
import { clearToken, isUserLoggedIn } from "@/utils/auth";

export const authSteps = ["welcome", "email", "phone", "success"] as const;

export type AuthStep = (typeof authSteps)[number];
// Define the type for the user
type registerFormType = {
	email: string;
	password: string;
	phoneNumber?: string;
};

// Define the type for the context
type UserContextType = {
	currentStep: AuthStep;
	form: registerFormType;
	goBack: () => void;
	logOut: () => void;
	setForm: (form: registerFormType) => void;
	setCurrentStep: (step: AuthStep) => void;
	isLoggedIn: boolean;
	setIsLoggedIn: (value: boolean) => void;
	modalOpen: boolean;
	setModalOpen: (value: boolean) => void;
};

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a custom hook to use the context
export const useAuthContext = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("useUser must be used within a UserProvider");
	}
	return context;
};

// Define the props interface for the provider component
type UserProviderProps = {
	children: ReactNode;
};

// Create the provider component
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [form, setForm] = useState<registerFormType>({
		email: "",
		password: "",
		phoneNumber: "",
	});

	const [currentStep, setCurrentStep] = useState<AuthStep>(authSteps[0]);


	function goBack() {
		setCurrentStep(authSteps[authSteps.indexOf(currentStep) - 1]);
	}

	function logOut() {
		clearToken("user");
		setIsLoggedIn(false);

		localStorage.setItem("isLoggedIn", JSON.stringify(false));
	}

	useEffect(() => {
		setIsLoggedIn(isUserLoggedIn());
	}, []);

	const value: UserContextType = {
		form,
		setForm,
		currentStep,
		setCurrentStep,
		goBack,
		isLoggedIn,
		logOut,
		setIsLoggedIn,
		modalOpen,
		setModalOpen,
	};

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
