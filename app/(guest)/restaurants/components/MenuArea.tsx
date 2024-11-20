import React from "react";
import { formatPrice } from "@/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useSetAtom } from "jotai";
import {addItemAtom} from "@/app/store/cart/cartAtom";
import {Plus} from "lucide-react";
function MenuArea({ data, categories }: any) {
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

	const groupedItems = categories.reduce((acc: any, category: any) => {
		acc[category._id] = {
			name: category.name,
			items: data.filter((item: any) => item.categoryId._id === category._id),
		};
		return acc;
	}, {});

	return (
		<div>
			<div>
				{Object.values(groupedItems).map((group: any) => (
					group.items.length > 0 && ( // Render only categories with items
						<div key={group.name} className="mb-8">
							<h2 className="text-lg font-semibold mb-4">{group.name}</h2>
							<ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								{group.items.map((item: any) => (
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
													variant={`outline`}
													className={` text-blue-500 bg-blue-200 p-2 rounded-full`}
													onClick={() => handleAddToCart(item)}
												>
													<Plus/>
												</Button>
											</div>
										</div>
									</li>
								))}
							</ul>
						</div>
					)
				))}
			</div>
		</div>
	);
}

export default MenuArea;
