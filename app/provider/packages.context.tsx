import type React from "react";
import { useState, createContext, useContext, type ReactNode } from "react"

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
export const usePackageContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("usePackageContext must be used within a UserProvider");
  }
  return context;
};

// Define the props interface for the provider component
type UserProviderProps = {
  children: ReactNode;
};

// Create the provider component
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const allSteps = ["welcome", "send"];

  const [user, setUser] = useState<UserType>({ email: "", password: "" });
  const [currentStep, setCurrentStep] = useState<string>(allSteps[0]);

  function goBack() {
    const currentIndex = allSteps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(allSteps[currentIndex - 1]);
    }
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
