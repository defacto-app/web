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
import MenuItemDetails from "./MenuItemDetails";

interface MenuAreaProps {
	data: any[];
	categories: any[];
}

function MenuArea({ data }: MenuAreaProps) {
	const addItem = useSetAtom(addItemAtom);
	const [quantity, setQuantity] = useState(1);
	const [isModalOpen, setIsModalOpen] = useState(false);

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
		setIsModalOpen(false);

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
									<Dialog
										key={item._id}
										open={isModalOpen}
										onOpenChange={setIsModalOpen}
									>
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
													<div
														className="flex-1 cursor-pointer"
														onClick={(e) => {
															e.stopPropagation();
															setIsModalOpen(true);
														}}
														onKeyDown={(e) => {
															if (e.key === "Enter" || e.key === " ") {
																e.stopPropagation();
																setIsModalOpen(true);
															}
														}}
														tabIndex={0}
														role="button"
													>
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
											<MenuItemDetails
												item={item}
												quantity={quantity}
												setQuantity={setQuantity}
												handleAddToCart={handleAddToCart}
											/>
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
