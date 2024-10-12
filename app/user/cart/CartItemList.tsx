"use client";
import React from "react";
import { formatPrice } from "@/utils";
import { Button } from "@/components/ui/button";
import { useCartContext, useCartSummaryContext } from "@/app/store/cartAtom";
import Image from "next/image";
function CartItemList() {
	const { cart, removeItem, updateItemQuantity, cartTotal } = useCartContext();

	const { totalPrice, deliveryFee, discountAmount, discount } =
		useCartSummaryContext();

	return (
		<div>
			<div className={`bg-white p-4 border rounded-lg`}>
				<div className="space-y-6  ">
					{cart.length > 0 ? (
						cart.map((item) => (
							<div
								key={item.id}
								className="flex items-center justify-between p-4  border-b last:border-b-0"
							>
								<div className="flex items-center">
									<Image
										width={64}
										height={64}
										src={item.image}
										alt={item.name}
										className="w-16 h-16 object-cover rounded-lg"
									/>
									<div className="ml-4">
										<p className="font-semibold">{item.name}</p>
										<p className="text-blue-500">{formatPrice(item.price)}</p>
									</div>
								</div>
								<div className="flex items-center space-x-2">
									<Button
										className="px-3 py-1 bg-gray-200 rounded-lg"
										onClick={() =>
											updateItemQuantity({
												itemId: item.id,
												quantity: item.quantity - 1,
											})
										}
										disabled={item.quantity === 1} // Disable if the quantity is 1
									>
										-
									</Button>
									<span>{item.quantity}</span>
									<Button
										className="px-3 py-1 bg-gray-200 rounded-lg"
										onClick={() =>
											updateItemQuantity({
												itemId: item.id,
												quantity: item.quantity + 1,
											})
										}
									>
										+
									</Button>
									<Button
										className="text-red-500"
										onClick={() => removeItem(item.id)}
									>
										🗑
									</Button>
								</div>
							</div>
						))
					) : (
						<p>Your cart is empty.</p>
					)}
				</div>
			</div>
		</div>
	);
}

export default CartItemList;
