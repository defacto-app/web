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
		<div className={`bg-white rounded-md  p-4 border mt-4`}>
			{data && (
				<div className={`grid grid-cols-2 gap-4`}>
					<div>
						<Label htmlFor="name">Name</Label>
						<Input
							id="name"
							name="name"
							value={data.name}
							onChange={handleInputChange}
							placeholder="Name"
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
				{action === "create" ? "New Restaurant" : "Update Restaurant"}
			</Button>
		</div>

	</div>;
};
