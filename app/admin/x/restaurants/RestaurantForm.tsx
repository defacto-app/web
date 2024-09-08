import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { RestaurantFormType } from "@/lib/types"; // Assuming you have this type

interface RestaurantFormProps {
	restaurant: RestaurantFormType | null;
	handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	submitHandler: () => void;
	loading: boolean;
}

export const RestaurantFormComponent = ({
	restaurant,
	handleInputChange,
	submitHandler,
	loading,
}: RestaurantFormProps) => {
	return (
		<div>
			<Button loading={loading} onClick={submitHandler}>
				Submit
			</Button>
			{restaurant && (
				<>
					<Input
						name="name"
						value={restaurant.name}
						onChange={handleInputChange}
						placeholder="Name"
					/>
					<Input
						name="rating"
						value={restaurant.rating}
						onChange={handleInputChange}
						placeholder="Rating"
					/>
					<Input
						name="deliveryTime"
						value={restaurant.deliveryTime}
						onChange={handleInputChange}
						placeholder="Delivery Time"
					/>
					<Input
						name="category"
						value={restaurant.category}
						onChange={handleInputChange}
						placeholder="Category"
					/>
					<Input
						name="address"
						value={restaurant.address}
						onChange={handleInputChange}
						placeholder="Address"
					/>
					<Input
						name="phone"
						value={restaurant.phone}
						onChange={handleInputChange}
						placeholder="Phone"
					/>
					<Input
						name="email"
						value={restaurant.email}
						onChange={handleInputChange}
						placeholder="Email"
					/>
					<Input
						name="openingHours"
						value={restaurant.openingHours}
						onChange={handleInputChange}
						placeholder="Opening Hours"
					/>
				</>
			)}
		</div>
	);
};
