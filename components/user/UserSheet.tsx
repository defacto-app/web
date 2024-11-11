"use client";
import { Button } from "@/components/ui/button";
import type React from "react";
import type { ReactNode } from "react";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import SendReceive from "../SendReceive";
import ReceiveSend from "../ReceiveSend";
import Image from "next/image";
import {
	usePackageContext,
	UserProvider,
} from "@/app/provider/packages.context";
import { MoveLeft } from "lucide-react";

interface UserSheetProps {
	children: ReactNode;
}

// Inner component that uses the context
const UserSheetContent: React.FC<UserSheetProps> = ({ children }) => {
	const packageContext = usePackageContext();

	if (!packageContext) {
		return null; // Handle the case where context is undefined
	}

	const { user, setUser, setCurrentStep, currentStep, goBack } = packageContext;
	function hideBackButton() {
		const shouldShow = ["welcome"];
		return !shouldShow.includes(currentStep);
	}
	// Example function to handle step change
	const handleNextStep = () => {
		setCurrentStep("nextStep"); // Update to the appropriate next step
	};

	return (
        <div className="">
			<Sheet>
				<SheetTrigger asChild>
					<div>{children}</div>
				</SheetTrigger>
				<SheetContent>
					<SheetHeader className="mb-10">
						<SheetTitle>
							<div>
								<Image
                                    className="h-10 w-auto"
                                    src="/logo.png"
                                    priority={true}
                                    alt="Logo"
                                    width={70}
                                    height={70}
                                    style={{
                                        maxWidth: "100%",
                                        height: "auto"
                                    }} />
							</div>
						</SheetTitle>
					</SheetHeader>

					{currentStep === "welcome" && (
						<>
							{hideBackButton() && (
								<div className="mb-5 mt-5 py-20">
									<Button
										className="bg-primary-600 rounded-full"
										onClick={goBack}
									>
										<MoveLeft />
									</Button>
								</div>
							)}
							<div className="mt-14 mb-10">
								<h1 className="text-lg font-semibold text-gray-800">
									Easy package delivery with Defacto
								</h1>
								<p className="text-base text-gray-600">
									Send and receive packages from friends, vendors, or loved
									ones.
								</p>
							</div>
							<SendReceive />
							<ReceiveSend />
						</>
					)}
					{/* Include components for other steps if needed */}
					{currentStep === "send" && (
						<>

						</>
					)}
					<SheetFooter>
						{currentStep !== "welcome" && (
							<Button onClick={goBack}>Back</Button>
						)}
					</SheetFooter>
				</SheetContent>
			</Sheet>
		</div>
    );
};

// Outer component that wraps UserSheetContent with UserProvider
const UserSheet: React.FC<UserSheetProps> = ({ children }) => (
	<UserProvider>
		<UserSheetContent>{children}</UserSheetContent>
	</UserProvider>
);

export default UserSheet;
