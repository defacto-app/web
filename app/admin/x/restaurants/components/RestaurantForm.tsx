import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { RestaurantFormType } from "@/lib/types";
import { Label } from "@/components/ui/label";
import CategorySelect from "@/app/admin/x/restaurants/components/CategorySelect";
import { OpeningHoursComponent } from "./OpeningHoursComponent";

interface RestaurantFormProps {
	restaurant: RestaurantFormType;
	handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	submitHandler: () => void;
	loading: boolean;
	action: "create" | "update";
	setRestaurantData: React.Dispatch<React.SetStateAction<RestaurantFormType>>;
}

export const RestaurantFormComponent = ({
	restaurant,
	handleInputChange,
	submitHandler,
	loading,
	action,
	setRestaurantData,
}: RestaurantFormProps) => {
	const handleOpeningHoursChange = (newHours: any) => {
		setRestaurantData((prev: any) => ({
			...prev,
			openingHours: {
				...prev.openingHours,
				...newHours
			}
		}));
	};
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
						<Label htmlFor="category">Category</Label>

						<CategorySelect />
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
				</div>
			)}
			<OpeningHoursComponent
				value={restaurant?.openingHours}
				onChange={handleOpeningHoursChange}
			/>

			<Button
				variant={`primary`}
				className={`w-40 mt-8`}
				loading={loading}
				onClick={submitHandler}
			>
				{action === "create" ? "Create" : "Update Restaurant"}
			</Button>
		</div>
	);
};
