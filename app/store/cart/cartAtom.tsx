// cartAtom.ts

import { atom, useAtomValue, useSetAtom } from "jotai";
import { usePathname } from "next/navigation";
import { useEffect, useCallback, useMemo, useState } from "react";

// Define the type for a cart item
type CartItemType = {
	publicId: string;
	name: string;
	price: number;
	quantity: number;
	image: string;
	parent: string;
};

// Atom to store all carts by restaurant slug
export const cartsByRestaurantAtom = atom<{ [slug: string]: CartItemType[] }>(
	{},
);
// Add a notifier atom for cart updates
export const cartUpdateNotifierAtom = atom(Date.now());
// Atom to hold the currently selected restaurant slug
export const selectedRestaurantSlugAtom = atom<string | null>(null);

// Atom to store the selected address in the cart
export const selectedAddressAtom = atom<any>(null);
export const setSelectedAddressAtom = atom(
	null,
	(get, set, selectedAddress: any) => {
		set(selectedAddressAtom, selectedAddress);
		sessionStorage.setItem("selectedAddress", JSON.stringify(selectedAddress));
	},
);
// Atom to add an item to the current restaurant's cart
export const addItemAtom = atom(null, (get, set, newItem: CartItemType) => {
	const slug = get(selectedRestaurantSlugAtom);
	if (!slug) return;

	const carts = get(cartsByRestaurantAtom);
	const currentCart = carts[slug] || [];

	const existingItem = currentCart.find(
		(item) => item.publicId === newItem.publicId,
	);
	const updatedCart = existingItem
		? currentCart.map((item) =>
				item.publicId === newItem.publicId
					? { ...item, quantity: item.quantity + newItem.quantity }
					: item,
			)
		: [...currentCart, newItem];

	// Update atom and session storage atomically
	const updates = { ...carts, [slug]: updatedCart };
	set(cartsByRestaurantAtom, updates);
	sessionStorage.setItem(`cart_${slug}`, JSON.stringify(updatedCart));
	// Trigger a re-render notification
	set(cartUpdateNotifierAtom, Date.now());
	//
	//
	//
	//
	//
	//
	//
});

// Atom to remove an item from the current restaurant's cart
export const removeItemAtom = atom(null, (get, set, itemId: string) => {
	const slug = get(selectedRestaurantSlugAtom);
	if (!slug) return;

	const carts = get(cartsByRestaurantAtom);
	const currentCart = carts[slug] || [];
	const updatedCart = currentCart.filter((item) => item.publicId !== itemId);

	set(cartsByRestaurantAtom, { ...carts, [slug]: updatedCart });
	sessionStorage.setItem(`cart_${slug}`, JSON.stringify(updatedCart));
});

// Atom to update item quantity in the current restaurant's cart
export const updateItemQuantityAtom = atom(
	null,
	(get, set, { itemId, quantity }: { itemId: string; quantity: number }) => {
		const slug = get(selectedRestaurantSlugAtom);
		if (!slug) return;

		const carts = get(cartsByRestaurantAtom);
		const currentCart = carts[slug] || [];
		const updatedCart = currentCart.map((item) =>
			item.publicId === itemId ? { ...item, quantity } : item,
		);

		set(cartsByRestaurantAtom, { ...carts, [slug]: updatedCart });
		sessionStorage.setItem(`cart_${slug}`, JSON.stringify(updatedCart));
	},
);

// Atom to clear the cart for the current restaurant
export const clearCartAtom = atom(null, (get, set) => {
	const slug = get(selectedRestaurantSlugAtom);
	if (!slug) return;

	set(cartsByRestaurantAtom, (carts) => ({ ...carts, [slug]: [] }));
	sessionStorage.removeItem(`cart_${slug}`);
});

// Hook to initialize and persist the cart for the selected restaurant slug
export const useRestaurantSlug = () => {
	const pathname = usePathname();
	const setSlug = useSetAtom(selectedRestaurantSlugAtom);
	const setCartsByRestaurant = useSetAtom(cartsByRestaurantAtom);

	useEffect(() => {
		// Convert pathname to kebab case for consistent storage
		const getSlugFromPath = (path: string) => {
			const parts = path.split("/");
			// Get the restaurant name from the path
			const restaurantName = parts[parts.length - 1];
			// Convert to kebab case
			return restaurantName
				.toLowerCase()
				.replace(/\s+/g, "-")
				.replace(/[^a-z0-9-]/g, "");
		};

		const slug = getSlugFromPath(pathname);

		if (slug) {
			setSlug(slug);
			try {
				const cartKey = `cart_${slug}`;
				const storedCart = sessionStorage.getItem(cartKey);

				if (storedCart) {
					const parsedCart = JSON.parse(storedCart);
					setCartsByRestaurant((prevCarts) => ({
						...prevCarts,
						[slug]: parsedCart,
					}));
				}
			} catch (error) {
				console.error("Error loading cart:", error);
				setCartsByRestaurant((prevCarts) => ({
					...prevCarts,
					[slug]: [],
				}));
			}
		}
	}, [pathname, setSlug, setCartsByRestaurant]);
};

// Create the hook to use the cart atoms in components

// Create the hook to use the cart atoms in components
export const useCartContext = () => {
	const [, setIsInitialized] = useState(false);
	useRestaurantSlug(); // Use the slug initialization hook

	const selectedSlug = useAtomValue(selectedRestaurantSlugAtom);
	const carts = useAtomValue(cartsByRestaurantAtom);
	const cart = useMemo(
		() => (selectedSlug ? carts[selectedSlug] || [] : []),
		[selectedSlug, carts],
	);

	useEffect(() => {
		if (selectedSlug && typeof carts[selectedSlug] !== "undefined") {
			setIsInitialized(true);
		}
	}, [selectedSlug, carts]);
	//
	//
	//
	//

	// Debugging statements to verify cart loading
	useEffect(() => {}, [selectedSlug, carts, cart]);

	const cartTotal = cart.reduce(
		(total, item) => total + item.price * item.quantity,
		0,
	);

	const addItem = useSetAtom(addItemAtom);
	const removeItem = useSetAtom(removeItemAtom);
	const updateItemQuantity = useSetAtom(updateItemQuantityAtom);
	const clearCart = useSetAtom(clearCartAtom);
	const setSelectedAddress = useSetAtom(setSelectedAddressAtom); // Ensure this is accessible

	const getCartSummary = useCallback(() => {
		return {
			itemCount: cart.reduce((count, item) => count + item.quantity, 0),
			totalPrice: cartTotal,
		};
	}, [cart, cartTotal]);

	return {
		cart,
		cartTotal,
		addItem,
		removeItem,
		updateItemQuantity,
		clearCart,
		getCartSummary,
		setSelectedAddress,
	};
};

// Cart summary context for additional calculations like discounts and delivery fee
export const useCartSummaryContext = () => {
	const { cartTotal } = useCartContext();
	const deliveryFee = 1000; // Example delivery fee
	const discount = 25; // Example discount

	const subtotal = cartTotal;
	const discountAmount = subtotal * (discount / 100);
	const totalPrice = subtotal - discountAmount + deliveryFee;

	// Get and parse the selected addresses from localStorage
	const selectedAddresses =
		typeof window !== "undefined"
			? JSON.parse(localStorage.getItem("selectedAddresses") || "[]")
			: [];
	const firstAddress =
		selectedAddresses.length > 0 ? selectedAddresses[0] : null;

	return {
		subtotal,
		discountAmount,
		deliveryFee,
		discount,
		totalPrice,
		firstAddress,
	};
};
