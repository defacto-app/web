"use client";
import React from "react";
import { useAtomAuthContext } from "@/app/store/authAtom";
import EditUserModal from "@/components/user/EditUserModal";
import EditUserNumberModal from "@/components/user/EditUserNumberModal";

function AccountPage() {
	const { authUser } = useAtomAuthContext();

	return (
		<div className="container mx-auto">
			<div className="flex flex-col items-center justify-center">
				<div className="w-full bg-white rounded-lg p-6 py-40">
					<h1 className="text-2xl font-bold mb-6">Account</h1>
					<div className="space-y-6">
						{/* User Info Section */}
						<div className="flex justify-between mb-7 mt-4">
							<div className="flex flex-col gap-y-2">
								<div>
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

						{/* Phone Section */}
						<div>
							<div className="flex justify-between mb-4">
								<div>
									<h1 className="mt-2 text-gray-500">Phone</h1>
									<h2>{authUser.phoneNumber || "not set"}</h2>
								</div>
								<div className="mt-2">
									<EditUserNumberModal />
								</div>
							</div>
							<div className="border-b mb-2 mt-2 border-gray-500" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AccountPage;
