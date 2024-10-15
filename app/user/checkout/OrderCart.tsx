import React from "react";
import { useCartContext } from "@/app/store/cartAtom"; // Adjust the path as per your project structure
import { formatPrice } from "@/utils";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import Link from "next/link";

function OrderCart() {
	// Get the cart items, removeItem, and updateItemQuantity functions from the context
	const { cart, updateItemQuantity, removeItem } = useCartContext();

	return (
		<div className="bg-white rounded-lg shadow p-4 w-full mx-auto">
			<h2 className="text-xl font-bold mb-4">Your order</h2>

			{/* Check if the cart has items */}
			{cart.length > 0 ? (
				cart.map((item) => (
					<div key={item.publicId} className=" mb-4">
						<div className="flex-1">
							<div className="flex items-center mb-1">
								<span className="font-semibold">{item.quantity}x</span>
								<span className="ml-2 text-lg font-medium">{item.name}</span>
							</div>

							<div className="text-lg font-bold text-green-700">
								{formatPrice(item.price)}
							</div>
						</div>

						<div className="flex  justify-between pt-4 items-center space-x-2">
							{/* Decrease quantity button */}
							<Button
								className="bg-gray-200 rounded-full p-2 text-green-600 "
								onClick={() =>
									updateItemQuantity({
										itemId: item.publicId,
										quantity: item.quantity - 1,
									})
								}
								disabled={item.quantity === 1} // Disable if the quantity is 1
							>
								<Minus />
							</Button>
							{/* Quantity Display */}
							<span>{item.quantity}</span>
							{/* Increase quantity button */}
							<Button
								className="bg-gray-200 rounded-full p-2 text-green-600"
								onClick={() =>
									updateItemQuantity({
										itemId: item.publicId,
										quantity: item.quantity + 1,
									})
								}
							>
								<Plus />
							</Button>
							{/* Remove item button */}
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

			{/* Order button */}
			<Link href={`/user/cart`}>
				<Button
					variant={`primary`}
					className=" text-white font-bold py-3 rounded-lg w-full mt-4"
				>
					Order {cart.length} for {""}
					{formatPrice(
						cart.reduce((total, item) => total + item.price * item.quantity, 0),
					)}
				</Button>
			</Link>
		</div>
	);
}

export default OrderCart;
