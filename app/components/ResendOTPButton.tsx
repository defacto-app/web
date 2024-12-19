import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"; // Assuming you are using a Button component from your UI library

interface ResendOTPButtonProps {
	onResend: () => void;
	loading: boolean;
	variant?:
		| "link"
		| "primary"
		| "secondary"
		| "ghost"
		| "destructive"
		| "outline"
		| "outlinePrimary";
	initialCountdown?: number; // Optional prop for custom countdown duration
}

const ResendOTPButton: React.FC<ResendOTPButtonProps> = ({
	onResend,
	initialCountdown = 60,
	loading,
	variant = "outline",
}) => {
	const [countdown, setCountdown] = useState<number>(initialCountdown);
	const [isResendDisabled, setIsResendDisabled] = useState<boolean>(false);

	useEffect(() => {
		let timer: NodeJS.Timeout;
		if (countdown > 0) {
			timer = setTimeout(() => setCountdown(countdown - 1), 1000);
		} else {
			setIsResendDisabled(false);
		}
		return () => clearTimeout(timer);
	}, [countdown]);

	const handleResendClick = () => {
		onResend(); // Call the function to resend OTP
		setIsResendDisabled(true);
		setCountdown(initialCountdown); // Reset countdown
	};

	return (
		<Button
			loading={loading}
			onClick={handleResendClick}
			disabled={isResendDisabled}
			variant={variant}
		>
			{isResendDisabled ? `Resend OTP in ${countdown}s` : "Resend OTP"}
		</Button>
	);
};

export default ResendOTPButton;
