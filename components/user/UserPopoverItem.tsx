import Link from "next/link";
import React, { useEffect, useState } from "react";
import EditUserModal from "./EditUserModal";
import EditUserNumberModal from "./EditUserNumberModal";
import EditUserPasswordModal from "./EditUserPasswordModal";
import { Button } from "@/components/ui/button";
import { clearToken } from "@/utils/auth";
import { useAuthContext } from "@/app/provider/auth.context";
import { $api } from "@/http/endpoints";

interface User {
  firstName?: string;
  email?: string;
  phone?: string;
}

export default function UserPopoverItem() {
	const {
		setIsLoggedIn,
		isLoggedIn,
		currentStep,
		goBack,
		modalOpen,
		setModalOpen,
	} = useAuthContext();

	const [user, setUser] = useState<User>({});


	async function logout() {
		clearToken("user");

		const data = await fetch(`/api/auth/logout`);

		setIsLoggedIn(false);
		localStorage.setItem("isLoggedIn", JSON.stringify(false));
	}

	const getMe = async () => {
		const { data } = await $api.auth.user.me();

		setUser(data.user);
	};

	useEffect(() => {
		getMe();
	}, []);

	return (
		<div>
			<div className="">
				<h1 className="mb-4 font-bold text-2xl">Hello {user.firstName}!</h1>
				<div className="border-b border-gray-500" />
			</div>

			<div className="flex justify-between mb-7 mt-4">
				<div className="flex flex-col gap-y-2">
					<div className="">
						<h1 className="mt-2 text-gray-500">Name</h1>
						<h2>{user.firstName}</h2>
					</div>
					<div>
						<h1 className="text-gray-500">Email</h1>
						<h1>{user.email}</h1>
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
							<h2>{user.phone || 'not set'}</h2>
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
