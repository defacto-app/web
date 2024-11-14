import { atom, useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import { useCallback } from "react";
import { usePathname } from "next/navigation";


// Define the type for a cart item
type CartItemType = {
	publicId: string;
	name: string;
	price: number;
	quantity: number;
	image: string;
};

// Atom to store all carts by restaurant slug
export const cartsByRestaurantAtom = atom<{ [slug: string]: CartItemType[] }>({});
// Atom to hold the currently selected restaurant slug
export const selectedRestaurantSlugAtom = atom<string | null>(null);
export const selectedAddressAtom = atom<any>(null);


//
// Atom to add an item to the current restaurant's cart
export const addItemAtom = atom(null, (get, set, newItem: CartItemType) => {
	const slug = get(selectedRestaurantSlugAtom);
	if (!slug) return;

	const carts = get(cartsByRestaurantAtom);
	const currentCart = carts[slug] || [];

	const existingItem = currentCart.find((item) => item.publicId === newItem.publicId);
	const updatedCart = existingItem
		? currentCart.map((item) =>
			item.publicId === newItem.publicId
				? { ...item, quantity: item.quantity + newItem.quantity }
				: item,
		)
		: [...currentCart, newItem];

	set(cartsByRestaurantAtom, { ...carts, [slug]: updatedCart });
	sessionStorage.setItem(`cart_${slug}`, JSON.stringify(updatedCart));
});

// Function to set the selected address in the cart
export const setSelectedAddressAtom = atom(
	null,
	(get, set, selectedAddress: any) => {
		set(selectedAddressAtom, selectedAddress);
		sessionStorage.setItem("selectedAddress", JSON.stringify(selectedAddress));
	},
);

// Utility function to get the initial cart items from session storage
const getInitialCartItems = (): CartItemType[] => {
	if (typeof window !== "undefined") {
		const storedCart = sessionStorage.getItem("cart");
		return storedCart ? JSON.parse(storedCart) : [];
	}
	return [];
};

// Atom to store the cart items
export const cartAtom = atom<CartItemType[]>(getInitialCartItems());

// Atom to store the cart's total price
export const cartTotalAtom = atom((get) => {
	const cart = get(cartAtom);
	return cart.reduce((total, item) => total + item.price * item.quantity, 0);
});

// Add item atom to add new items to the cart

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
// Atom to update item quantity in the cart

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

export const useRestaurantSlug = () => {
	const pathname = usePathname();
	const setSlug = useSetAtom(selectedRestaurantSlugAtom);
	const setCartsByRestaurant = useSetAtom(cartsByRestaurantAtom);

	useEffect(() => {
		console.log("Current pathname:", pathname);

		// Extract the slug part from the path
		const slug = pathname.split("/")[2]; // assuming the path is like "/restaurants/[slug]"
		console.log("Extracted slug:", slug);

		if (slug) {
			setSlug(slug);
			const storedCart = sessionStorage.getItem(`cart_${slug}`);
			const initialCart = storedCart ? JSON.parse(storedCart) : [];
			setCartsByRestaurant((prevCarts) => ({ ...prevCarts, [slug]: initialCart }));
		}
	}, [pathname, setSlug, setCartsByRestaurant]);
};

// Atom to clear the cart for the current restaurant
export const clearCartAtom = atom(null, (get, set) => {
	const slug = get(selectedRestaurantSlugAtom);
	if (!slug) return;

	set(cartsByRestaurantAtom, (carts) => ({ ...carts, [slug]: [] }));
	sessionStorage.removeItem(`cart_${slug}`);
});
// Create the hook to use the cart atoms in components
export const useCartContext = () => {
	useRestaurantSlug();
	const selectedSlug = useAtomValue(selectedRestaurantSlugAtom);
	const carts = useAtomValue(cartsByRestaurantAtom);
	const cart = selectedSlug ? carts[selectedSlug] || [] : [];

	const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

	const addItem = useSetAtom(addItemAtom);
	const removeItem = useSetAtom(removeItemAtom);
	const updateItemQuantity = useSetAtom(updateItemQuantityAtom);
	const clearCart = useSetAtom(clearCartAtom);



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
	};
};
export const useCartSummaryContext = () => {
	const cartTotal = useAtomValue(cartTotalAtom);
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
		firstAddress, // Include the first address in the returned values
	};
};