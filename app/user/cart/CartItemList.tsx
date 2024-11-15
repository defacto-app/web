"use client";
import React, { useEffect, useState } from "react";
import { formatPrice } from "@/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useSetAtom, useAtomValue } from "jotai";
import {
	selectedRestaurantSlugAtom,
	cartsByRestaurantAtom,
	useCartContext,
} from "@/app/store/cart/cartAtom";

function CartItemList() {
	const setSlug = useSetAtom(selectedRestaurantSlugAtom);
	const setCartsByRestaurant = useSetAtom(cartsByRestaurantAtom);
	const slug = useAtomValue(selectedRestaurantSlugAtom);
	const { cart, removeItem, updateItemQuantity } = useCartContext();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Retrieve stored slug from session storage
		const storedSlug = sessionStorage.getItem("currentRestaurantSlug");

		// If no slug is set in atom, set it from session storage
		if (storedSlug && slug !== storedSlug) {
			setSlug(storedSlug);
		}

		// Check if cart data for the stored slug is already in cartsByRestaurantAtom
		if (storedSlug) {
			const storedCart = sessionStorage.getItem(`cart_${storedSlug}`);
			if (storedCart) {
				setCartsByRestaurant((prevCarts) => ({
					...prevCarts,
					[storedSlug]: JSON.parse(storedCart),
				}));
			}
		}

		// Stop loading once slug and cart data are set
		setIsLoading(false);
	}, [setSlug, setCartsByRestaurant, slug]);

	// Don't render content until the slug and cart data are fully initialized
	if (isLoading) {
		return <p>Loading...</p>;
	}

	// Debugging information to confirm cart data

	return (
		<div>
			<div className="bg-white p-4 border rounded-lg">
				<div className="space-y-6">
					{cart.length > 0 ? (
						cart.map((item) => (
							<div
								key={item.publicId}
								className="flex items-center justify-between p-4 border-b last:border-b-0"
							>
								<div className="flex items-center">
									<Image
										width={64}
										height={64}
										src={item.image}
										alt={item.name}
										priority={true}
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
												itemId: item.publicId,
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
												itemId: item.publicId,
												quantity: item.quantity + 1,
											})
										}
									>
										+
									</Button>
									<Button
										className="text-red-500"
										onClick={() => removeItem(item.publicId)}
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
