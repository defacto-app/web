import Link from "next/link";
import React from "react";
import EditUserModal from "./EditUserModal";
import EditUserNumberModal from "./EditUserNumberModal";
import { Button } from "@/components/ui/button";

import { useAtomAuthContext } from "@/app/store/authAtom";
import { useRouter } from "next/navigation";
import { truncateText } from "@/utils";


export default function UserPopoverItem() {
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
				<Link href={`/user/account`}>Account</Link>
				<Link href={`/user/order/history`}>Order history</Link>
				<Button
					onClick={logout}
					variant={`outline`}
					className="text-red-500 font-bold w-40"
				>
					Log out
				</Button>
			</div>

			<div className="flex justify-between mb-7 mt-4">
				<div className="flex flex-col gap-y-2">
					<div className="">
						<h1 className="mt-2 text-gray-500">Name</h1>
						<h2>{authUser.firstName || authUser.email}</h2>
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
			<div className="border-b border-gray-500" />
			<div>
				<div className="flex justify-between mb-4">
					<div>
						<div>
							<h1 className="mt-2 text-gray-500">Phone</h1>
							<h2>{authUser.phoneNumber || "not set"}</h2>
						</div>
					</div>
					<div className="mt-2">
						<EditUserNumberModal />
					</div>
				</div>
				<div className="border-b mb-2 mt-2 border-gray-500" />
			</div>
			<div className="flex justify-between mb-4">
				<div>
					<div />
				</div>
				<div></div>
			</div>
		</div>
	);
}
