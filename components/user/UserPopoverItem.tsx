import Link from "next/link";
import React, { useEffect, useState } from "react";
import EditUserModal from "./EditUserModal";
import EditUserNumberModal from "./EditUserNumberModal";
import EditUserPasswordModal from "./EditUserPasswordModal";
import { Button } from "@/components/ui/button";
import { clearToken } from "@/utils/auth";
import { useAuthContext } from "@/app/provider/auth.context";
import { $api } from "@/http/endpoints";
import { useAtomAuthContext } from "@/app/store/authAtom";
import { useRouter } from "next/navigation";
import { truncateText } from "@/utils";
interface User {
	firstName?: string;
	email?: string;
	phone?: string;
}

export default function UserPopoverItem() {
	const { logOut, authUser, setModalOpen } = useAtomAuthContext();
	const router = useRouter();
	async function logout() {
		const data = await fetch(`/api/auth/logout`);

		router.push("/");
		logOut();

		setModalOpen(false);
	}

	return (
		<div>
			<div className="">
				<h1 className="mb-4 font-bold text-xl">
					Hello{" "}
					{truncateText(
						authUser.firstName || authUser.email || authUser.phone,
						15,
					)}
					!
				</h1>

				<div className="border-b border-gray-500" />
			</div>

			<Link href={`/user/account`}>Account</Link>
			<Link href={`/user/order/history`}>Order history</Link>

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
							<h2>{authUser.phone || "not set"}</h2>
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
				<div>
					<Button
						onClick={logout}
						variant={`ghost`}
						className="text-red-500 font-bold"
					>
						Log out
					</Button>
				</div>
			</div>
		</div>
	);
}
