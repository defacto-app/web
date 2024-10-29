"use client";

import React, { useState, useEffect } from "react";
import { useCartContext } from "@/app/store/cartAtom";
import Link from "next/link";
import {useGoogleAddressAtomContext} from "@/app/store/addressAtom";

function UserCart() {
	const { cartTotal, cart } = useCartContext();
	const [isClient, setIsClient] = useState(false);
	const {savedAddress}= useGoogleAddressAtomContext();

	// Ensures this component only accesses the cart after mounting in the browser
	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient) {
		// Return null or some fallback (loading) UI on server-side
		return null;
	}

	return (
		<div className={`hidden lg:block`}>
			<Link href={`/user/cart`}>Cart items {savedAddress} {JSON.stringify(cart.length)}</Link>
		</div>
	);
}

export default UserCart;
