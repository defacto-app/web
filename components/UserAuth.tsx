"use client";
import React from "react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import SigninModal from "./auth/SigninModal";
import { Button, buttonVariants } from "@/components/ui/button";
import { TiMessage } from "react-icons/ti";
import { X } from "lucide-react";
import { cn } from "@/utils/cn";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export default function UserAuth() {
	const [open, setOpen] = React.useState(true);
	return (
		<div >
			<div>
				<AlertDialog defaultOpen={open} open={open}>
					<AlertDialogTrigger
						onClick={() => setOpen(true)}
						className="w-32 h-10 bg-blue-500 rounded-full text-white"
					>
						{/* <User className="text-primary-600"/> */}
						Get Started
					</AlertDialogTrigger>
					<AlertDialogContent className={`min-h-min py-12`}>
						<VisuallyHidden>
							<AlertDialogTitle />
							<AlertDialogDescription />
						</VisuallyHidden>

						<SigninModal />
						<AlertDialogFooter>
							<Button
								onClick={() => setOpen(false)}
								variant="outline"
								className="absolute bg-gray-400 hover:bg-gray-400 hover:text-white top-2 right-2 text-white p-2 rounded-full"
							>
								<X />
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</div>
		</div>
	);
}
