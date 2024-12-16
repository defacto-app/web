import React from "react";
import { ChevronDown, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAtomAuthContext } from "@/app/store/authAtom";

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";
import { truncateText } from "@/utils";
import Link from "next/link";
import EditUserModal from "@/components/user/EditUserModal";
import EditUserNumberModal from "@/components/user/EditUserNumberModal";

export default function UserPopover() {
	const { logOut, authUser, setModalOpen } = useAtomAuthContext();
	const router = useRouter();
	async function logout() {
		await fetch(`/api/auth/logout`);

		router.push("/");
		await logOut();

		setModalOpen(false);
	}

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
					<div>
						<div className="">
							<h1 className="mb-4 font-bold text-xl">
								Hello{" "}
								{truncateText(
									authUser.firstName || authUser.email || authUser.phoneNumber,
									15,
								)}
							</h1>

							<div className="border-b border-gray-500" />
						</div>

						<div className={`flex flex-col gap-y-4 mt-4`}>
							<Link className="font-medium" href={`/user/account`}>Account</Link>
							<Link className="font-medium" href={`/user/order/history`}>Order history</Link>
						</div>

						<div className="flex justify-between mb-7 mt-4">
							<div className="flex flex-col gap-y-2">
								<div className="">
									<h1 className="mt-2 text-gray-500">Name</h1>
									<h2>{authUser.firstName || "Not set"}</h2>
								</div>
								<div>
									<h1 className="text-gray-500">Email</h1>
									<h1>{authUser.email}</h1>
								</div>
							</div>
							<div className="mt-2">
								<EditUserModal />
							</div>
						</div>
						<div className="border-b border-gray-200" />
						<div>
							<div className="flex justify-between mb-4">
								<div>
									<div>
										<h1 className="mt-2 text-gray-500">Phone</h1>
										<h2>{authUser.phoneNumber || "Not set"}</h2>
									</div>
								</div>
								<div className="mt-2">
									<EditUserNumberModal />
								</div>
							</div>
							<div className="border-b mb-2 mt-2 border-gray-200" />
						</div>
						<div className="flex justify-between mb-4">
						<Button
								onClick={logout}
								variant={`outline`}
								className="text-red-500 font-bold w-40"
							>
								Log out
							</Button>
						</div>
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
}

// user popover

// user menu
