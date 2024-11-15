"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react"; // Assuming you're using lucide icons
import { Button } from "@/components/ui/button";

// Add this component at the top of your JSX
const BackButton = () => {
	const router = useRouter();

	return (
		<Button variant="ghost" onClick={() => router.back()}>
			<ArrowLeft size={40} />
		</Button>
	);
};

export default BackButton;
