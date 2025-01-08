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
		} as any;
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
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{group.items.map((item: any) => (
									<div
										key={item._id}
										className={`bg-white rounded-lg p-4 ${
											!item.available && "opacity-75"
										}`}
									>
										<div className="flex justify-between items-start gap-4">
											<div className="flex gap-4 flex-1">
												<div className="relative w-32 h-32 flex-shrink-0">
													<Image
														src={item.image}
														alt={item.name}
														className="rounded-lg object-cover"
														fill
														sizes="(max-width: 128px) 100vw, 128px"
													/>
												</div>
												<div className="flex-1">
													<h3 className="text-lg font-medium mb-2">
														{item.name}
													</h3>
													<p className="text-gray-600 text-sm mb-2 line-clamp-20">
														{item.description}
													</p>
													<div className="flex items-center gap-2">
														<span className="font-semibold">
															{formatPrice(item.price)}
														</span>
														{!item.available && (
															<span className="bg-red-100 text-red-500 px-2 py-1 rounded text-sm">
																Currently unavailable
															</span>
														)}
													</div>
												</div>
											</div>
											<Button
												variant="ghost"
												size="icon"
												className="rounded-full bg-gray-100 hover:bg-gray-200"
												onClick={() => handleAddToCart(item)}
												disabled={!item.available}
												title={
													!item.available ? "Item unavailable" : "Add to cart"
												}
											>
												<Plus className="h-5 w-5 text-blue-500 stroke-[3]" />
											</Button>
										</div>
									</div>
								))}
							</div>
						</div>
					),
			)}
		</div>
	);
}

export default MenuArea;
