import type React from "react";
import { Input } from "@/components/ui/input";

interface PhoneInputProps {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	name?: string;
	placeholder?: string;
	className?: string;
}

const PhoneInput = ({
	value,
	onChange,
	name = "phoneNumber",
	placeholder = "Phone Number",
	className,
}: PhoneInputProps) => {
	return (
		<div
			className={`flex w-full rounded-lg border overflow-hidden ${className}`}
		>
			<div className="flex items-center gap-x-2 px-2 py-2 bg-white border-r">
				<span>🇳🇬</span>
				<span className="text-gray-600">+234</span>
			</div>
			<Input
				name={name}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-[#F5F8FF]"
			/>
		</div>
	);
};

export default PhoneInput;
