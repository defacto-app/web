import React, { useState } from "react";
import { formatPrice } from "@/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useSetAtom } from "jotai";
import { addItemAtom } from "@/app/store/cart/cartAtom";
import { Plus, Minus } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogTrigger,
} from "@/components/ui/fullscreen-dialog";

interface MenuAreaProps {
	data: any[];
	categories: any[];
}

function MenuArea({ data }: MenuAreaProps) {
	const addItem = useSetAtom(addItemAtom);
	const [quantity, setQuantity] = useState(1);

	const handleAddToCart = (item: any, qty = 1) => {
		const cartItem = {
			publicId: item.publicId,
			name: item.name,
			price: item.price,
			quantity: qty,
			image: item.image,
			parent: item.parent,
		};
		addItem(cartItem);
	};

	const groupedItems = data.reduce((acc: any, item: any) => {
		const categoryId = item.category._id;
		const categoryName = item.category.name;

		if (!acc[categoryId]) {
			acc[categoryId] = {
				name: categoryName,
				items: [],
			};
		}

		acc[categoryId].items.push(item);
		return acc;
	}, {});

	if (data.length === 0) {
		return (
			<div className="text-center py-10">
				<p className="text-gray-500">No menu items found.</p>
			</div>
		);
	}

	return (
		<div>
			{Object.entries(groupedItems).map(
				([categoryId, group]: [string, any]) =>
					group.items.length > 0 && (
						<div
							key={categoryId}
							id={`category-${categoryId}`}
							className="mb-8 scroll-mt-20"
						>
							<h2 className="text-lg font-semibold mb-4">{group.name}</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
								{group.items.map((item: any) => (
									<Dialog key={item._id} onOpenChange={() => setQuantity(1)}>
										<div
											className={`border rounded-lg p-2 relative min-h-[180px] ${
												!item.available ? "opacity-50" : ""
											}`}
										>
											<div className="flex gap-6">
												<div>
													<DialogTrigger asChild>
														<div className="cursor-pointer">
															<div className="relative w-24 h-24 flex-shrink-0">
																<Image
																	src={item.image}
																	alt={item.name}
																	className="rounded-lg object-cover"
																	fill
																	sizes="(max-width: 96px) 100vw, 96px"
																/>
															</div>
															<div className="mt-1 text-lg font-medium">
																{formatPrice(item.price)}
															</div>
														</div>
													</DialogTrigger>
												</div>

												<DialogTrigger asChild>
													<div className="flex-1 cursor-pointer">
														<h3 className="text-lg font-semibold">
															{item.name}
														</h3>
														<p className="text-gray-500 text-sm mt-1">
															{item.description}
														</p>
														{!item.available && (
															<p className="text-red-500 text-sm mt-2">
																Currently unavailable
															</p>
														)}
													</div>
												</DialogTrigger>
											</div>

											<Button
												variant="ghost"
												size="icon"
												className="rounded-full h-10 w-10 absolute right-4 bottom-4 bg-gray-100 flex items-center justify-center"
												onClick={(e) => {
													e.stopPropagation();
													handleAddToCart(item);
												}}
												disabled={!item.available}
												title={
													!item.available ? "Item unavailable" : "Add to cart"
												}
											>
												<Plus className="h-6 w-6 text-blue-500 stroke-[3]" />
											</Button>
										</div>
										<DialogContent className="sm:max-w-[600px] sm:rounded-lg sm:min-h-[400px] h-auto p-6 bg-white">
											<div className="flex flex-col h-full">
												{/* Image Section */}
												<div className="relative w-full h-64">
													<Image
														src={item.image}
														alt={item.name}
														className="object-cover"
														fill
														sizes="(max-width: 600px) 100vw, 600px"
													/>
												</div>

												{/* Content Container */}
												<div className="p-6 space-y-6">
													{/* Details Section */}
													<div className="rounded-lg p-4">
														<h3 className="text-xl font-semibold">
															{item.name}
														</h3>
														<p className="text-gray-700 mt-2">
															{item.description}
														</p>
														<p className="text-xl font-semibold mt-4">
															{formatPrice(item.price)}
														</p>
													</div>

													{/* Action Section */}
													<div className="flex flex-col gap-4">
														{/* Quantity Selector */}
														<div className="flex justify-center">
															<div className="inline-flex items-center bg-gray-100 rounded-full">
																<button
																	type="button"
																	className="p-3"
																	onClick={() =>
																		setQuantity(Math.max(1, quantity - 1))
																	}
																>
																	<Minus className="h-6 w-6 text-gray-600" />
																</button>
																<span className="w-12 text-center text-xl">
																	{quantity}
																</span>
																<button
																	type="button"
																	className="p-3"
																	onClick={() => setQuantity(quantity + 1)}
																>
																	<Plus className="h-6 w-6 text-gray-600" />
																</button>
															</div>
														</div>

														{/* Add to Cart Button */}
														<Button
															className="w-full rounded-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg"
															onClick={() => handleAddToCart(item, quantity)}
														>
															Add {quantity} for{" "}
															{formatPrice(item.price * quantity)}
														</Button>
													</div>
												</div>
											</div>
										</DialogContent>
									</Dialog>
								))}
							</div>
						</div>
					),
			)}
		</div>
	);
}

export default MenuArea;
