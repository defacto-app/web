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
import { Trash2, Minus, Plus } from "lucide-react"; // Import icons

function CartItemList() {
	const setSlug = useSetAtom(selectedRestaurantSlugAtom);
	const setCartsByRestaurant = useSetAtom(cartsByRestaurantAtom);
	const slug = useAtomValue(selectedRestaurantSlugAtom);
	const { cart, removeItem, updateItemQuantity } = useCartContext();
	const [isLoading, setIsLoading] = useState(true);

	const [restaurantName, setRestaurantName] = useState<string | null>(null);

	useEffect(() => {
		const name = sessionStorage.getItem("currentRestaurantName");
		setRestaurantName(name);
	}, []);

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

	const subtotal = cart.reduce((total, item) => {
		return total + (item.price * item.quantity);
	}, 0);


	// Debugging information to confirm cart data

	return (
		<div>
			<div className="w-full max-w-4xl mx-auto">
				<div className="bg-white shadow-sm rounded-lg overflow-hidden">
					{/* Restaurant Header */}
					<div className="border-b p-4 bg-gray-50">
						<h2 className="text-xl font-semibold text-gray-800">
							{restaurantName || 'Restaurant'}
						</h2>
					</div>

					{/* Cart Items */}
					<div className="divide-y divide-gray-100">
						{cart.length > 0 ? (
							cart.map((item) => (
								<div
									key={item.publicId}
									className="p-4 hover:bg-gray-50 transition-colors"
								>
									<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
										{/* Item Info */}
										<div className="flex items-center flex-1 min-w-0">
											<div
												className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
												<Image
													src={item.image}
													alt={item.name}
													fill
													className="object-cover"
													priority
												/>
											</div>
											<div className="ml-4 flex-1 min-w-0">
												<h3 className="font-medium text-gray-900 truncate">
													{item.name}
												</h3>
												<p className="text-blue-600 font-semibold mt-1">
													{formatPrice(item.price)}
												</p>
											</div>
										</div>

										{/* Quantity Controls */}
										<div className="flex items-center gap-2 sm:gap-4">
											<div className="flex items-center bg-gray-100 rounded-lg">
												<Button
													variant="ghost"
													size="icon"
													className="h-8 w-8"
													onClick={() =>
														updateItemQuantity({
															itemId: item.publicId,
															quantity: item.quantity - 1,
														})
													}
													disabled={item.quantity === 1}
												>
													<Minus className="h-4 w-4"/>
												</Button>
												<span className="w-8 text-center font-medium">
                                                {item.quantity}
                                            </span>
												<Button
													variant="ghost"
													size="icon"
													className="h-8 w-8"
													onClick={() =>
														updateItemQuantity({
															itemId: item.publicId,
															quantity: item.quantity + 1,
														})
													}
												>
													<Plus className="h-4 w-4"/>
												</Button>
											</div>
											<Button
												variant="destructive"
												size="icon"
												className="h-8 w-8"
												onClick={() => removeItem(item.publicId)}
											>
												<Trash2 className="h-4 w-4"/>
											</Button>
										</div>
									</div>
								</div>
							))
						) : (
							<div className="p-8 text-center text-gray-500">
								<div className="mb-4">
									🛒
								</div>
								<p className="text-lg font-medium">Your cart is empty</p>
								<p className="mt-1 text-sm">Add items to get started</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default CartItemList;
