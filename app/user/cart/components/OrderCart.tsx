import type React from "react";

import { formatPrice } from "@/utils";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useAtomAuthContext } from "@/app/store/authAtom";
import { usePathname, useRouter } from "next/navigation";
import { useAtomValue } from "jotai";
import {
	selectedRestaurantSlugAtom,
	useCartContext,
} from "@/app/store/cart/cartAtom";

type propTypes = {
	buttonOnly?: boolean;
};

function OrderCart({ buttonOnly = false }: propTypes) {
	const router = useRouter();
	// Get the cart items, removeItem, and updateItemQuantity functions from the context
	const { cart, updateItemQuantity, removeItem } = useCartContext();

	const { isLoggedIn } = useAtomAuthContext();
	const pathname = usePathname();

	const slug = pathname.split("/")[2]; // Get the current restaurant slug

	function handleCartNavigation() {
		if (!isLoggedIn) {
			// Redirect to login page

			router.push("/auth/login");
		} else {
			router.push(`/user/cart/${slug}`);
			// Redirect to cart page
		}
	}
	// You can add your logic here

	return (
		<div className="bg-white rounded-lg shadow p-4 w-[350px] mx-auto">
			<h2 className="text-lg font-medium mb-4">Your order</h2>

			{!buttonOnly && (
				<div className="max-h-[400px] overflow-y-auto">
					{cart.length > 0 ? (
						cart.map((item) => (
							<div key={item.publicId} className="mb-6">
								{/* Item Info Row */}
								<div className="flex items-center justify-between mb-2">
									<span className="text-gray-600">{item.quantity}x</span>
									<span className="flex-1 mx-4">{item.name}</span>
									<span className="font-medium">{formatPrice(item.price)}</span>
								</div>

								{/* Controls Row */}
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<Button
											variant="ghost"
											size="sm"
											className="h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-200"
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

										<span className="text-sm text-gray-500">Takeaway pack</span>

										<Button
											variant="ghost"
											size="sm"
											className="h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-200"
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
										variant="ghost"
										size="sm"
										className="text-red-400 hover:text-red-500"
										onClick={() => removeItem(item.publicId)}
									>
										<Trash2 className="h-4 w-4" />
									</Button>
								</div>
							</div>
						))
					) : (
						<p className="text-center text-gray-500 py-8">
							Your cart is empty.
							<br />
							Add items to get started.
						</p>
					)}
				</div>
			)}

			{/* Order button */}

			<Button
				variant={`primary`}
				className=" text-white font-bold  w-full mt-4"
				onClick={handleCartNavigation}
				disabled={cart.length === 0}
			>
				Order {cart.length} for {""}
				{formatPrice(
					cart.reduce(
						(total: number, item: { price: number; quantity: number }) =>
							total + item.price * item.quantity,
						0,
					),
				)}
			</Button>
		</div>
	);
}

export default OrderCart;
