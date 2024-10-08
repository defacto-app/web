import React from "react";
import { useCartContext } from "@/app/store/cartAtom";
import Link from "next/link";
function UserCart() {
	const { cartTotal, cart } = useCartContext();
	return <div>

		<Link href={`/cart`}>
			Cart items {JSON.stringify(cart.length)}
		</Link>

	</div>


}
export default UserCart;
