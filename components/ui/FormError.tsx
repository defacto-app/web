// components/ui/FormError.tsx
import type React from "react";

interface FormErrorProps {
	error: string;
}

const FormError: React.FC<FormErrorProps> = ({ error }) => {
	if (!error) return null;

	return <div className="text-red-500 text-xs mt-1">{error}</div>;
};

export default FormError;