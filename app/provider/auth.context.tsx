import type React from "react";
import { useState, createContext, useContext, type ReactNode } from "react";

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

	setForm: (form: registerFormType) => void;
	setCurrentStep: (step: AuthStep) => void;
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
	const allSteps = ["welcome",  "email", "phone", "success"];

	const [form, setForm] = useState<registerFormType>({
		email: "",
		password: "",
		phoneNumber: "",
	});

	const [currentStep, setCurrentStep] = useState<AuthStep>(authSteps[0]);

	function goBack() {


		setCurrentStep(authSteps[authSteps.indexOf(currentStep) - 1]);
	}

	const value: UserContextType = {
		form,
		setForm,
		currentStep,
		setCurrentStep,
		goBack,
	};

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
