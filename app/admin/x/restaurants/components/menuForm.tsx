import type React from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import type {MenuItemType} from "@/lib/types";
interface MenuFormProps {
	data: MenuItemType | null;
	handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	submitHandler: () => void;
	loading: boolean;
	action: "create" | "update";
}
export const MenuForm = ({
	data,
	handleInputChange,
	submitHandler,
	loading,
	action,
}: MenuFormProps) => {
	return <div>
		<div >
			{data && (
				<div className="grid grid-cols-2 gap-4">
					<div>
						<Label htmlFor="name">Name</Label>
						<Input
							id="name"
							name="name"
							value={data.name}
							onChange={handleInputChange}
							placeholder="Enter food name"
						/>
					</div>

					<div>
						<Label htmlFor="category">Category</Label>
						<Input
							id="category"
							name="category"
							value={data.category}
							onChange={handleInputChange}
							placeholder="Enter category"
						/>
					</div>

					<div>
						<Label htmlFor="menuType">Menu Type</Label>
						<Input
							id="menuType"
							name="menuType"
							value={data.menuType}
							onChange={handleInputChange}
							placeholder="Enter menu type"
						/>
					</div>

					<div>
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
				</div>

			)}
			<Button
				variant={`primary`}
				className={`w-40 mt-8`}
				loading={loading}
				onClick={submitHandler}
			>
				{action === "create" ? "New Menu" : "Update Menu"}
			</Button>
		</div>

	</div>;
};
