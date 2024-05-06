
import React, { useState, createContext, useContext, ReactNode } from "react";

interface PackageFlowProviderProps {
  children: React.ReactNode;
}
// Define the type for package data
type PackageData = { /* Define package properties */ };

// Define the type for the package flow context
type PackageFlowContextType = {
  currentStep: string;
  packages: PackageData[];
  selectedPackages: PackageData[];
  paymentDetails: any; // Define type for payment details
  goBack: () => void;

  selectPackages: (packages: PackageData[]) => void;
  setPaymentDetails: (details: any) => void;
  setCurrentStep: (step: string) => void;
};

// Create the context
const PackageFlowContext = createContext<PackageFlowContextType | undefined>(undefined);

// Custom hook to use the package flow context
export const usePackageFlowContext = () => {
  const context = useContext(PackageFlowContext);
  if (!context) {
    throw new Error("usePackageFlowContext must be used within a PackageFlowProvider");
  }
  return context;
};

// Provider component for package flow
export const PackageFlowProvider: React.FC<PackageFlowProviderProps> = ({ children }) => {
  const allSteps = ["welcome", "select-packages", "payment", "confirmation"];

  const [packages, setPackages] = useState<PackageData[]>([]); // All available packages
  const [selectedPackages, setSelectedPackages] = useState<PackageData[]>([]); // Selected packages
  const [paymentDetails, setPaymentDetails] = useState<any>(null); // Payment details
  const [currentStep, setCurrentStep] = useState<string>(allSteps[0]);

  function goBack() {
    setCurrentStep(allSteps[allSteps.indexOf(currentStep) - 1]);
  }

  const value: PackageFlowContextType = {
    currentStep,
    packages,
    selectedPackages,
    paymentDetails,
    goBack,

    selectPackages: (selected: PackageData[]) => setSelectedPackages(selected),
    setPaymentDetails,
    setCurrentStep,
  };

  return <PackageFlowContext.Provider value={value}>{children}</PackageFlowContext.Provider>;
};
