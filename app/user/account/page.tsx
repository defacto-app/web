import React from "react";
import {Button} from "@/components/ui/button";

function AccountPage() {
	return (
		<div className={`container mx-auto`}>
			<div className=" flex flex-col items-center justify-center">
				<div className="w-full  bg-white rounded-lg  p-6 py-40">
					<h1 className="text-2xl font-bold mb-6">Account</h1>
					<div className="space-y-6">
						{/* Username */}
						<div className="flex justify-between items-center">
							<div className="flex items-center space-x-3">
								<i className="fas fa-user text-lg"></i>
								<span>sam</span>
							</div>
							<Button variant={`outline`}  className=" hover:underline">
								Edit
							</Button>
						</div>

						{/* Email */}
						<div className={`space-y-14`}>
							<div className="flex justify-between items-center">
								<div className="flex items-center space-x-3">
									<i className="fas fa-envelope text-lg"></i>
									<span>samuelnmeje@gmail.com</span>
								</div>
								<Button variant={`outline`} className=" hover:underline">
									Edit
								</Button>
							</div>

							{/* Change Password */}
							<div className="flex justify-between items-center">
								<div className="flex items-center space-x-3">
									<i className="fas fa-lock text-lg"></i>
									<span>Change password</span>
								</div>
								<Button variant={`outline`} className=" hover:underline">
									Edit
								</Button>
							</div>

							{/* Change Phone Number */}
							<div className="flex justify-between items-center">
								<div className="flex items-center space-x-3">
									<i className="fas fa-phone text-lg"></i>
									<span>Change phone number</span>
								</div>
								<Button variant={`outline`} className=" hover:underline">
									Edit
								</Button>
							</div>

							{/* Payment Methods */}
							<div className="flex justify-between items-center">
								<div className="flex items-center space-x-3">
									<i className="fas fa-credit-card text-lg"></i>
									<span>Payment methods</span>
								</div>
								<Button variant={`outline`} className=" hover:underline">
									Edit
								</Button>
							</div>

							{/* Manage Privacy */}
							<div className="flex justify-between items-center">
								<div className="flex items-center space-x-3">
									<i className="fas fa-bullhorn text-lg"></i>
									<span>Manage privacy</span>
								</div>
								<Button variant={`outline`} className=" hover:underline">
									Edit
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AccountPage;
