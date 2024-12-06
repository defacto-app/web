"use client";
import React, {useEffect, useMemo, useState} from "react";
import { formatPrice } from "@/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {useAtomValue, useSetAtom,} from "jotai";
import {
	cartsByRestaurantAtom, selectedRestaurantSlugAtom,
	useCartContext,
} from "@/app/store/cart/cartAtom";
import { Trash2, Minus, Plus } from "lucide-react";
import {  usePathname } from "next/navigation";

function CartItemList() {
	const selectedSlug = useAtomValue(selectedRestaurantSlugAtom);
	const carts = useAtomValue(cartsByRestaurantAtom);
	const cart = useMemo(() => selectedSlug ? carts[selectedSlug] || [] : [], [selectedSlug, carts]);
	const setCartsByRestaurant = useSetAtom(cartsByRestaurantAtom);
	const { removeItem, updateItemQuantity } = useCartContext();
	const [isLoading, setIsLoading] = useState(true);
	const pathname = usePathname();

	useEffect(() => {
		const initializeCart = async () => {
			const storedSlug = pathname.split("/")[3];

			if (storedSlug) {
				const storedCart = sessionStorage.getItem(`cart_${storedSlug}`);
				console.log("Loading cart for:", storedSlug, storedCart);

				if (storedCart) {
					setCartsByRestaurant((prevCarts) => ({
						...prevCarts,
						[storedSlug]: JSON.parse(storedCart),
					}));
				}
			}
			setIsLoading(false);
		};

		initializeCart();
	}, [pathname, setCartsByRestaurant]);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	return (
		<div>
			<div className="w-full max-w-4xl mx-auto">
				<div className="bg-white shadow-sm rounded-lg overflow-hidden">
					<div className="divide-y divide-gray-100">
						{Array.isArray(cart) && cart.length > 0 ? (
							cart.map((item) => (
								<CartItem
									key={item.publicId}
									item={item}
									updateItemQuantity={updateItemQuantity}
									removeItem={removeItem}
								/>
							))
						) : (
							<EmptyCartMessage />
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default CartItemList;

// CartItem Component
const CartItem = ({ item, updateItemQuantity, removeItem }: any) => (
	<div className="p-4 hover:bg-gray-50 transition-colors">
		<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
			{/* Item Info */}
			<div className="flex items-center flex-1 min-w-0">
				<div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
					<Image
						src={item.image}
						alt={item.name}
						fill
						className="object-cover"
						priority
					/>
				</div>
				<div className="ml-4 flex-1 min-w-0">
					<h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
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
						<Minus className="h-4 w-4" />
					</Button>
					<span className="w-8 text-center font-medium">{item.quantity}</span>
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
						<Plus className="h-4 w-4" />
					</Button>
				</div>
				<Button
					variant="destructive"
					size="icon"
					className="h-8 w-8"
					onClick={() => removeItem(item.publicId)}
				>
					<Trash2 className="h-4 w-4" />
				</Button>
			</div>
		</div>
	</div>
);

// EmptyCartMessage Component
const EmptyCartMessage = () => (
	<div className="p-8 text-center text-gray-500">
		<div className="mb-4">🛒</div>
		<p className="text-lg font-medium">Your cart is empty</p>
		<p className="mt-1 text-sm">Add items to get started</p>
	</div>
);
