import React from "react";
import * as Popover from "@radix-ui/react-popover";
import { Cross2Icon } from "@radix-ui/react-icons";
import UserPopoverItem from "./UserPopoverItem";
import { ChevronDown, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAtomAuthContext } from "@/app/store/authAtom";

export default function UserPopover() {
	const {  authUser } = useAtomAuthContext();

	return (
		<div>
			<Popover.Root>
				<Popover.Trigger asChild>
					<Button
						variant={`outline`}
						className={`rounded-full`}
						aria-label="Update dimensions"
					>
						{/* <MixerHorizontalIcon /> */}
						<div className="flex items-center gap-x-2">
							<UserIcon className="text-primary-600" />
							<p>{authUser?.firstName || authUser.email || authUser.phoneNumber}</p>
							<ChevronDown />
						</div>
					</Button>
				</Popover.Trigger>
				<Popover.Portal>
					<Popover.Content
						className="rounded-lg p-5 w-[350px] z-50 bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
						sideOffset={5}
					>
						<UserPopoverItem />
						<Popover.Close
							className="rounded-full text-primary-600 font-bold  h-[25px] w-[25px] inline-flex items-center justify-center text-violet11 absolute top-[5px] right-[5px] hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 outline-none cursor-default"
							aria-label="Close"
						>
							<Cross2Icon />
						</Popover.Close>
						<Popover.Arrow className="fill-white" />
					</Popover.Content>
				</Popover.Portal>
			</Popover.Root>
		</div>
	);
}
