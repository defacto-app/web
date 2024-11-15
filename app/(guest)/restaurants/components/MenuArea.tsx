import React from "react";
import { formatPrice } from "@/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useSetAtom } from "jotai";
import {addItemAtom} from "@/app/store/cart/cartAtom";
import {Plus} from "lucide-react";

function MenuArea({ data }: any) {
	const addItem = useSetAtom(addItemAtom); // Get the setter for adding items to the cart

	// Handle adding an item to the cart
	const handleAddToCart = (item: any) => {
		const cartItem = {
			publicId: item.publicId,
			name: item.name,
			price: item.price,
			quantity: 1, // Default to adding one item
			image: item.image,
		};
		addItem(cartItem); // Add the item to the cart
	};

	return (
		<div>
			<div>
				<div>
					{data.length > 0 ? (
							<ul className="mt-6 grid grid-cols-1  gap-4 sm:grid-cols-2 lg:grid-cols-3">
							{data.map((item: any) => (
								<li key={item._id}>
									<div className={`bg-white border rounded-sm`}>
										<Image
											src={item.image}
											alt={item.name}
											className={`rounded-t-sm h-64 w-full object-cover`}
											width={150}
											height={400}
										/>
										<div className={`p-4 flex items-center justify-between`}>
											<div>
												<h3>{item.name}</h3>
												<p>Price: {formatPrice(item.price)}</p>
											</div>

											<Button
												className={`bg-blue-500 text-white p-2 rounded-sm`}
												onClick={() => handleAddToCart(item)} // Add to Cart handler
											>
												<Plus />
											</Button>
										</div>
									</div>
								</li>
							))}
						</ul>
					) : (
						<p>No menu items available.</p>
					)}
				</div>
			</div>
		</div>
	);
}

export default MenuArea;
