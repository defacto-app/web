import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { RestaurantFormType } from "@/lib/types";
import { Label } from "@/components/ui/label";
import CategorySelect from "@/app/admin/x/restaurants/components/CategorySelect";

interface RestaurantFormProps {
	restaurant: RestaurantFormType | null;
	handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	submitHandler: () => void;
	loading: boolean;
	action: "create" | "update";
}

export const RestaurantFormComponent = ({
	restaurant,
	handleInputChange,
	submitHandler,
	loading,
	action,
}: RestaurantFormProps) => {
	return (
		<div className={`bg-white rounded-md  p-4 border mt-4`}>
			{restaurant && (
				<div className={`grid grid-cols-2 gap-4`}>
					<div>
						<Label htmlFor="name">Name</Label>
						<Input
							id="name"
							name="name"
							value={restaurant.name}
							onChange={handleInputChange}
							placeholder="Name"
						/>
					</div>

					<div>
						<Label htmlFor="deliveryTime">Delivery Time</Label>
						<Input
							id="deliveryTime"
							name="deliveryTime"
							value={restaurant.deliveryTime}
							onChange={handleInputChange}
							placeholder="Delivery Time"
						/>
					</div>
					<div>
						<CategorySelect/>
						<Label htmlFor="category">Category</Label>
						<Input
							id="category"
							name="category"
							value={restaurant.category}
							onChange={handleInputChange}
							placeholder="Category"
						/>
					</div>
					<div>
						<Label htmlFor="address">Address</Label>
						<Input
							id="address"
							name="address"
							value={restaurant.address}
							onChange={handleInputChange}
							placeholder="Address"
						/>
					</div>
					<div>
						<Label htmlFor="phone">Phone</Label>
						<Input
							id="phone"
							name="phone"
							value={restaurant.phone}
							onChange={handleInputChange}
							placeholder="Phone"
						/>
					</div>
					<div>
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							name="email"
							value={restaurant.email}
							onChange={handleInputChange}
							placeholder="Email"
						/>
					</div>
					<div>
						<Label htmlFor="openingHours">Opening Hours</Label>
						<Input
							id="openingHours"
							name="openingHours"
							value={restaurant.openingHours}
							onChange={handleInputChange}
							placeholder="Opening Hours"
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
	);
};
