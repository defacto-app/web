import type React from "react";

import { formatPrice } from "@/utils";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useAtomAuthContext } from "@/app/store/authAtom";
import { useRouter } from "next/navigation";
import { useAtomValue } from "jotai";
import {
	selectedRestaurantSlugAtom,
	useCartContext,
} from "@/app/store/cart/cartAtom";

type propTypes = {
	buttonOnly?: boolean;
	restaurant_name?: string;
};

function OrderCart({ buttonOnly = false, restaurant_name }: propTypes) {
	const router = useRouter();
	// Get the cart items, removeItem, and updateItemQuantity functions from the context
	const { cart, updateItemQuantity, removeItem } = useCartContext();

	const { isLoggedIn } = useAtomAuthContext();

	const slug = useAtomValue(selectedRestaurantSlugAtom); // Get the current restaurant slug

	function handleCartNavigation() {
		if (!isLoggedIn) {
			// Redirect to login page

			router.push("/auth/login");
		} else {
			if (slug) {
				sessionStorage.setItem("currentRestaurantSlug", slug);
				if (typeof restaurant_name === "string") {
					sessionStorage.setItem("currentRestaurantName", restaurant_name);
				} // Replace with actual restaurant name
			}
			router.push("/user/cart");
			// Redirect to cart page
		}
	}
	// You can add your logic here

	return (
		<div className="bg-white rounded-lg shadow p-4 w-[350px] mx-auto">
			<h2 className="text-lg font-medium mb-4">Your order </h2>

			{!buttonOnly && (
				<div>
					{/* Check if the cart has items */}
					{cart.length > 0 ? (
						cart.map(
							(item: {
								publicId: string;
								quantity: number;
								name: string;
								price: number;
							}) => (
								<div key={item.publicId} className=" mb-4">
									<div className="flex-1">
										<div className="flex gap-x-4 justify-between items-center mb-1">
											<span className="font-semibold">{item.quantity}x</span>
											<span className="ml-2 text-md ">{item.name}</span>
											<div className="text-md font-medium ">
												{formatPrice(item.price)}
											</div>
										</div>
									</div>

									<div className="flex justify-between pb-2 items-center ">
										<div className={`flex items-center justify-between  gap-x-4`}>
											{/* Decrease quantity button */}
											<Button
												variant={`ghost`}
												className=" text-green-600 "
												onClick={() =>
													updateItemQuantity({
														itemId: item.publicId,
														quantity: item.quantity - 1,
													})
												}
												disabled={item.quantity === 1} // Disable if the quantity is 1
											>
												<Minus className={`bg-gray-300  rounded-full`} />
											</Button>
											<span className={`text-gray-700 text-xs`}>Takeaway pack</span>
											<Button
												variant={`ghost`}
												className=" text-green-600 "
												onClick={() =>
													updateItemQuantity({
														itemId: item.publicId,
														quantity: item.quantity + 1,
													})
												}
											>
												<Plus className={`bg-gray-300  rounded-full`} />
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
							),
						)
					) : (
						<p className={`text-center text-sm py-10`}>
							Your products list is empty. <br /> Start adding products to see
							them displayed here!
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
