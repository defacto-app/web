import React from "react";
import { formatPrice } from "@/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useSetAtom } from "jotai";
import { addItemAtom } from "@/app/store/cart/cartAtom";
import { Plus } from "lucide-react";

interface MenuAreaProps {
	data: any[];
	categories: any[];
}

function MenuArea({ data, categories }: MenuAreaProps) {
	const addItem = useSetAtom(addItemAtom);

	const handleAddToCart = (item: any) => {
		const cartItem = {
			publicId: item.publicId,
			name: item.name,
			price: item.price,
			quantity: 1,
			image: item.image,
		};
		addItem(cartItem);
	};

	const groupedItems = categories.reduce((acc: any, category: any) => {
		acc[category._id] = {
			name: category.name,
			items: data.filter((item: any) => item.categoryId._id === category._id),
		};
		return acc;
	}, {});

	if (data.length === 0) {
		// Show "No menu items found" if data is empty
		return (
			<div className="text-center py-10">
				<p className="text-gray-500">No menu items found.</p>
			</div>
		);
	}

	return (
		<div>
			<div>
				{Object.entries(groupedItems).map(
					([categoryId, group]: [string, any]) =>
						group.items.length > 0 && (
							<div
								key={categoryId}
								id={`category-${categoryId}`}
								className="mb-8 scroll-mt-20" // Add padding for smooth scroll
							>
								<h2 className="text-lg font-semibold mb-4">{group.name}</h2>
								<ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
									{group.items.map((item: any) => (
										<li key={item._id}>
											<div
												className={`bg-white border rounded-sm relative ${!item.available && "opacity-75"}`}
											>
												<Image
													src={item.image}
													alt={item.name}
													className="rounded-t-sm h-64 w-full object-cover"
													width={150}
													height={400}
												/>
												<div className="p-4 flex items-center justify-between">
													<div>
														<h3
															className={!item.available ? "text-gray-500" : ""}
														>
															{item.name}
														</h3>
														<p
															className={!item.available ? "text-gray-500" : ""}
														>
															Price: {formatPrice(item.price)}
														</p>
														{!item.available && (
															<span className="text-sm text-red-500">
																Currently unavailable
															</span>
														)}
													</div>
													<Button
														variant="outline"
														className="text-blue-500 bg-blue-200 p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
														onClick={() => handleAddToCart(item)}
														disabled={!item.available}
														title={
															!item.available
																? "Item unavailable"
																: "Add to cart"
														}
													>
														<Plus />
													</Button>
												</div>
											</div>
										</li>
									))}
								</ul>
							</div>
						),
				)}
			</div>
		</div>
	);
}

export default MenuArea;
