import React from "react";
import { useCartContext } from "@/app/store/cartAtom"; // Adjust the path as per your project structure
import { formatPrice } from "@/utils";
import { Button } from "@/components/ui/button";
import { Minus, Plus,  Trash2 } from "lucide-react";
import { useAtomAuthContext } from "@/app/store/authAtom";
import { useRouter } from "next/navigation";

type propTypes = {
	buttonOnly?: boolean;
};

function OrderCart({ buttonOnly = false }: propTypes) {
	const router = useRouter();
	// Get the cart items, removeItem, and updateItemQuantity functions from the context
	const { cart, updateItemQuantity, removeItem } = useCartContext();

	const {  isLoggedIn } = useAtomAuthContext();

	function handleCartNavigation() {
		if (!isLoggedIn) {
			// Redirect to login page

			router.push("/auth/login");
		} else {
			router.push("/user/cart");
			// Redirect to cart page
		}
		console.log("Navigating to cart", isLoggedIn);
	}
	// You can add your logic here

	return (
		<div className="bg-white rounded-lg shadow p-4 w-full mx-auto">
			<h2 className="text-lg font-medium mb-4">Your order</h2>

			{!buttonOnly && (
				<div>
					{/* Check if the cart has items */}
					{cart.length > 0 ? (
						cart.map((item) => (
							<div key={item.publicId} className=" mb-4">
								<div className="flex-1">
									<div className="flex items-center mb-1">
										<span className="font-semibold">{item.quantity}x</span>
										<span className="ml-2 text-lg font-medium">
											{item.name}
										</span>
									</div>

									<div className="text-lg font-bold text-green-700">
										{formatPrice(item.price)}
									</div>
								</div>

								<div className="flex justify-between pt-4 items-center ">
									<div className={`flex items-center gap-x-6`}>
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
									</div>
									{/* Remove item button */}
									<Button
										variant={`ghost`}
										className="text-red-500"
										onClick={() => removeItem(item.publicId)}
									>
										<Trash2 />
									</Button>
								</div>
							</div>
						))
					) : (
						<p>Your cart is empty.</p>
					)}
				</div>
			)}

			{/* Order button */}

			<Button
				variant={`primary`}
				className=" text-white font-bold py-3 rounded-lg w-full mt-4"
				onClick={handleCartNavigation}
			>
				Order {cart.length} for {""}
				{formatPrice(
					cart.reduce((total, item) => total + item.price * item.quantity, 0),
				)}
			</Button>
		</div>
	);
}

export default OrderCart;
