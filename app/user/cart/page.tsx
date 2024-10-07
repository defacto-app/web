import React from "react";
import { Button } from "@/components/ui/button";

function Page() {
	return (
		<div className="p-8">
			{/* Cart Header */}
			<h1 className="text-4xl font-bold mb-8">Your cart</h1>

			{/* Main Container */}
			<div className="flex flex-col lg:flex-row justify-between gap-8">
				{/* Left Side (Items and Delivery Info) */}
				<div className="flex-1 space-y-8">
					{/* Delivery Section */}
					<div className="bg-white p-6 rounded-lg border">
						<h2 className="text-lg font-semibold mb-2">Deliver to</h2>
						<div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
							<div className="flex items-center">
								<span className="text-blue-500 mr-4">📍</span>
								<div>
									<p className="font-semibold">
										Home{" "}
										<span className="text-sm text-blue-500">(Default)</span>
									</p>
									<p className="text-sm text-gray-500">
										Times Square NYC, Manhattan
									</p>
								</div>
							</div>
							<Button className="text-blue-500 font-medium">Edit</Button>
						</div>
					</div>

					{/* Order Summary Section */}
					<div className="space-y-6">
						{/* Single Item */}
						<div className="flex items-center justify-between bg-white p-4 rounded-lg border">
							<div className="flex items-center">
								<img
									src="https://via.placeholder.com/64"
									alt="Mixed Vegetable Salad"
									className="w-16 h-16 object-cover rounded-lg"
								/>
								<div className="ml-4">
									<p className="font-semibold">Mixed Vegetable Salad</p>
									<p className="text-blue-500">₦2,000</p>
								</div>
							</div>
							<div className="flex items-center space-x-2">
								<Button className="px-3 py-1 bg-gray-200 rounded-lg">-</Button>
								<span>1</span>
								<Button className="px-3 py-1 bg-gray-200 rounded-lg">+</Button>
								<Button className="text-red-500">🗑</Button>
							</div>
						</div>

						{/* Add Item Button */}
						<Button className="text-blue-500 font-medium">+ Add Item</Button>
					</div>
				</div>

				{/* Right Side (Order Summary and Checkout) */}
				<div className="w-full lg:w-1/3 space-y-8">
					{/* Payment & Discount */}
					<div className="bg-white p-6 rounded-lg shadow-md space-y-4">
						<div className="flex items-center justify-between">
							<span>Payment Methods</span>
							<span className="text-blue-500 font-medium">E-Wallet</span>
						</div>
						<div className="flex items-center justify-between">
							<span>Get Discounts</span>
							<Button className="bg-blue-500 text-white px-4 py-1 rounded-lg">
								Discount 20%
							</Button>
						</div>
					</div>

					{/* Order Summary Section */}
					<div className="bg-white p-6 rounded-lg shadow-md space-y-4">
						<h2 className="text-lg font-semibold">Order Summary</h2>
						<div className="flex justify-between">
							<span>Subtotal</span>
							<span className="font-semibold">₦10,000</span>
						</div>
						<div className="flex justify-between text-red-500">
							<span>Discount (-20%)</span>
							<span>-₦2,000</span>
						</div>
						<div className="flex justify-between">
							<span>Delivery Fee</span>
							<span className="font-semibold">₦500</span>
						</div>
						<hr />
						<div className="flex justify-between text-xl font-bold">
							<span>Total</span>
							<span>₦8,500</span>
						</div>
						<div className="flex items-center space-x-2">
							<input
								type="text"
								placeholder="Add promo code"
								className="flex-1 border rounded-lg p-2"
							/>
							<Button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
								Apply
							</Button>
						</div>
						<Button className="w-full bg-blue-500 text-white px-4 py-3 mt-4 rounded-lg">
							Go to Checkout →
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Page;
