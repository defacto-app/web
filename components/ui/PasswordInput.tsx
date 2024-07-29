import type React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
	value: string;
	placeholder: string;
	required?: boolean;
	name: string;
	handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
														 value,
														 placeholder,
														 required = false,
														 name,
														 handleInputChange,
													 }) => {
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div className="relative">
			<Input
				id="sign-password"
				name={name}
				type={showPassword ? "text" : "password"}
				placeholder={placeholder}
				required={required}
				value={value}
				onChange={handleInputChange}
			/>
			<button
				type="button"
				onClick={togglePasswordVisibility}
				className="absolute inset-y-0 right-0 px-3 flex items-center"
			>
				{showPassword ? (
					<EyeOff className="h-5 w-5 text-gray-500" />
				) : (
					<Eye className="h-5 w-5 text-gray-500" />
				)}
			</button>
		</div>
	);
};

export default PasswordInput;
