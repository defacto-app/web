import type React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import type { MenuItemType } from "@/lib/types";

interface MenuFormProps {
	data: MenuItemType | null;
	handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleAvailabilityChange?: (checked: boolean) => void;
	submitHandler: () => void;
	loading: boolean;
	action: "create" | "update";
}

export const MenuForm = ({
							 data,
							 handleInputChange,
							 handleAvailabilityChange,
							 submitHandler,
							 loading,
							 action,
						 }: MenuFormProps) => {
	return (
		<div className="w-full max-w-2xl mx-auto p-4">
			<div>
				{data && (
					<div className="space-y-6">
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="name">Name</Label>
								<Input
									id="name"
									name="name"
									value={data.name}
									onChange={handleInputChange}
									placeholder="Enter food name"
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="category">Category</Label>
								<Input
									id="category"
									name="category"
									value={data.category}
									onChange={handleInputChange}
									placeholder="Enter category"
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="price">Price</Label>
								<Input
									type="number"
									id="price"
									name="price"
									value={data.price}
									onChange={handleInputChange}
									placeholder="Enter price"
								/>
							</div>

							<div className="space-y-2 sm:flex sm:items-end">
								<div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg w-full">
									<div className="space-y-1">
										<Label htmlFor="availability">
											{data.available ? "Available" : "Unavailable"}
										</Label>
										<p className="text-sm text-gray-500">Toggle menu item availability</p>
									</div>
									<Switch
										id="availability"
										checked={data.available}
										onCheckedChange={handleAvailabilityChange}
									/>
								</div>
							</div>
						</div>
					</div>
				)}
				<div className="mt-8 flex justify-center sm:justify-start">
					<Button
						variant="primary"
						className="w-full sm:w-40"
						disabled={loading}
						onClick={submitHandler}
					>
						{loading ? "Processing..." : action === "create" ? "New Menu" : "Update Menu"}
					</Button>
				</div>
			</div>
		</div>
	);
};