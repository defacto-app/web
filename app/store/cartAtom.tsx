import { atom, useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import { useCallback } from "react";

// Define the type for a cart item
type CartItemType = {
	id: string;
	name: string;
	price: number;
	quantity: number;
	image: string;
};

// Utility function to get the initial cart items from session storage
const getInitialCartItems = (): CartItemType[] => {
	const storedCart = sessionStorage.getItem("cart");
	return storedCart ? JSON.parse(storedCart) : [];
};

// Atom to store the cart items
export const cartAtom = atom<CartItemType[]>(getInitialCartItems());

// Atom to store the cart's total price
export const cartTotalAtom = atom((get) => {
	const cart = get(cartAtom);
	return cart.reduce((total, item) => total + item.price * item.quantity, 0);
});

// Add item atom to add new items to the cart
export const addItemAtom = atom(null, (get, set, newItem: CartItemType) => {
	const currentCart = get(cartAtom);
	const existingItem = currentCart.find((item) => item.id === newItem.id);

	let updatedCart:any;
	if (existingItem) {
		// Update the quantity if the item already exists
		updatedCart = currentCart.map((item) =>
			item.id === newItem.id
				? { ...item, quantity: item.quantity + newItem.quantity }
				: item,
		);
	} else {
		// Add the new item to the cart
		updatedCart = [...currentCart, newItem];
	}

	set(cartAtom, updatedCart);
	sessionStorage.setItem("cart", JSON.stringify(updatedCart));
});

// Atom to remove an item from the cart
export const removeItemAtom = atom(null, (get, set, itemId: string) => {
	const currentCart = get(cartAtom);
	const updatedCart = currentCart.filter((item) => item.id !== itemId);
	set(cartAtom, updatedCart);
	sessionStorage.setItem("cart", JSON.stringify(updatedCart));
});

// Atom to update item quantity in the cart
export const updateItemQuantityAtom = atom(
	null,
	(get, set, { itemId, quantity }: { itemId: string; quantity: number }) => {
		const currentCart = get(cartAtom);
		const updatedCart = currentCart.map((item) =>
			item.id === itemId ? { ...item, quantity } : item,
		);
		set(cartAtom, updatedCart);
		sessionStorage.setItem("cart", JSON.stringify(updatedCart));
	},
);

// Atom to clear the cart
export const clearCartAtom = atom(null, (get, set) => {
	set(cartAtom, []);
	sessionStorage.removeItem("cart");
});

// Create the hook to use the cart atoms in components
export const useCartContext = () => {
	const cart = useAtomValue(cartAtom); // Read the cart
	const cartTotal = useAtomValue(cartTotalAtom); // Read the cart total

	const deliveryFee = 1000; // Example delivery fee
	const discount = 25; // Example discount

	const addItem = useSetAtom(addItemAtom); // Add an item
	const removeItem = useSetAtom(removeItemAtom); // Remove an item
	const updateItemQuantity = useSetAtom(updateItemQuantityAtom); // Update item quantity
	const clearCart = useSetAtom(clearCartAtom); // Clear the cart

	// Persist the cart in session storage whenever it changes
	useEffect(() => {
		sessionStorage.setItem("cart", JSON.stringify(cart));
	}, [cart]);

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

	return {
		subtotal,
		discountAmount,
		deliveryFee,
		discount,
		totalPrice,
	};
}
