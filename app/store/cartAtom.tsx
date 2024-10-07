import { atom, useAtomValue, useSetAtom } from "jotai";
import { useCallback } from "react";

// Define the type for a cart item
type CartItemType = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
};

// Atom to store the cart items
export const cartAtom = atom<CartItemType[]>([]);

// Atom to store the cart's total price
export const cartTotalAtom = atom((get) => {
    const cart = get(cartAtom);
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
});

// Add item atom to add new items to the cart
export const addItemAtom = atom(null, (get, set, newItem: CartItemType) => {
    const currentCart = get(cartAtom);
    const existingItem = currentCart.find((item) => item.id === newItem.id);

    if (existingItem) {
        // Update the quantity if the item already exists
        const updatedCart = currentCart.map((item) =>
            item.id === newItem.id ? { ...item, quantity: item.quantity + newItem.quantity } : item
        );
        set(cartAtom, updatedCart);
    } else {
        // Add the new item to the cart
        set(cartAtom, [...currentCart, newItem]);
    }
});

// Atom to remove an item from the cart
export const removeItemAtom = atom(null, (get, set, itemId: string) => {
    const currentCart = get(cartAtom);
    const updatedCart = currentCart.filter((item) => item.id !== itemId);
    set(cartAtom, updatedCart);
});

// Atom to update item quantity in the cart
export const updateItemQuantityAtom = atom(
    null,
    (get, set, { itemId, quantity }: { itemId: string; quantity: number }) => {
        const currentCart = get(cartAtom);
        const updatedCart = currentCart.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
        );
        set(cartAtom, updatedCart);
    }
);

// Atom to clear the cart
export const clearCartAtom = atom(null, (get, set) => {
    set(cartAtom, []);
});

// Create the hook to use the cart atoms in components
export const useCartContext = () => {
    const cart = useAtomValue(cartAtom); // Read the cart
    const cartTotal = useAtomValue(cartTotalAtom); // Read the cart total

    const addItem = useSetAtom(addItemAtom); // Add an item
    const removeItem = useSetAtom(removeItemAtom); // Remove an item
    const updateItemQuantity = useSetAtom(updateItemQuantityAtom); // Update item quantity
    const clearCart = useSetAtom(clearCartAtom); // Clear the cart

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
