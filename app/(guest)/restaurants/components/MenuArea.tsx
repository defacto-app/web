import React from "react";
import { formatPrice } from "@/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useSetAtom } from "jotai";
import {addItemAtom} from "@/app/store/cartAtom";

function MenuArea({ data }: any) {
	const addItem = useSetAtom(addItemAtom); // Get the setter for adding items to the cart

	// Handle adding an item to the cart
	const handleAddToCart = (item: any) => {
		const cartItem = {
			id: item._id,
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
					<h2>Menu</h2>
					{data.length > 0 ? (
						<ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
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
										<div className={`p-4`}>
											<h3>{item.name}</h3>
											<p>Price: {formatPrice(item.price)}</p>

											<Button
												className={`bg-blue-500 text-white p-2 rounded-sm mt-10`}
												onClick={() => handleAddToCart(item)} // Add to Cart handler
											>
												Add to Cart
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
