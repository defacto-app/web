import React, { useState, createContext, useContext, ReactNode } from "react";

// Define the type for the user
type UserType = { email: string; password: string };

// Define the type for the context
type UserContextType = {
  currentStep: string;
  user: UserType;
  goBack: () => void;

  setUser: (user: UserType) => void;
  setCurrentStep: (step: string) => void;
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
  const allSteps = ["welcome", "email", "password","forgotpassword", "complete"];

  const [user, setUser] = useState<any>({ email: "", password: "" });
  const [currentStep, setCurrentStep] = useState<string>(allSteps[0]);

  function goBack() {
    setCurrentStep(allSteps[allSteps.indexOf(currentStep) - 1]);
  }

  const value: UserContextType = {
    user,
    setUser,
    currentStep,
    setCurrentStep,
    goBack,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
