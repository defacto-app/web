import React from "react";
import UserPopoverItem from "./UserPopoverItem";
import { ChevronDown, UserIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAtomAuthContext } from "@/app/store/authAtom";

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

export default function UserPopover() {
	const { authUser } = useAtomAuthContext();

	return (
		<div>
			<Popover>
				<PopoverTrigger asChild>
					<Button variant="outline">
						<div className="flex items-center ">
							<UserIcon className="text-primary-600" />
							<p className={`hidden md:block`}>
								{authUser?.firstName || authUser.email || authUser.phoneNumber}
							</p>
							<ChevronDown />
						</div>
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-80">
					<UserPopoverItem />
				</PopoverContent>
			</Popover>
		</div>
	);
}
