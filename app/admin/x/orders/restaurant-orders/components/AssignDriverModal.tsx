import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDebounce } from "react-haiku";
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { $admin_api } from "@/http/admin-endpoint";
import SearchBar from "@/components/SearchBar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";

interface AssignDriverModalProps {
	orderId: string;
	onDriverAssigned?: () => void;
}

const fetchUsers = async (
	page: number,
	perPage: number,
	searchTerm: string,
	role: string,
) => {
	const response = await $admin_api.users.all({
		page,
		perPage,
		searchTerm,
		role,
	});
	return response.data.data; // Assuming response.data contains the restaurant list
};

export function AssignDriverModal({
	orderId,
	onDriverAssigned,
}: AssignDriverModalProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [search, setSearch] = useState("");
	const [selectedDriver, setSelectedDriver] = useState<string>("");
	const debouncedSearch = useDebounce(search, 500);

	// Fetch drivers
	const { data: drivers, isLoading } = useQuery(
		["drivers", debouncedSearch],
		() => fetchUsers(1, 10, debouncedSearch, "driver"),
		{
			enabled: isOpen, // Only fetch when modal is open
		},
	);

	// Assign driver to order
	const handleAssignDriver = async () => {
		if (!selectedDriver) {
			toast.error("Please select a driver");
			return;
		}

		try {
			await $admin_api.orders.update(orderId, {
				driverId: selectedDriver,
			});

			toast.success("Driver assigned successfully");
			onDriverAssigned?.();
			setIsOpen(false);
		} catch (error) {
			toast.error("Failed to assign driver");
		}
	};

	return (
		<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
			<AlertDialogTrigger asChild>
				<Button variant="outline">Assign driver</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="max-w-2xl h-full">
				<AlertDialogHeader>
					<AlertDialogTitle>Assign a Driver for the Order</AlertDialogTitle>
					<div className="py-4">
						{JSON.stringify(orderId)}
						<SearchBar
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							placeholder="Search for driver..."
							isLoading={isLoading}
						/>
					</div>
				</AlertDialogHeader>

				<div className="max-h-[400px] overflow-y-auto py-4">
					{isLoading ? (
						<div className="text-center py-4">Loading drivers...</div>
					) : drivers?.length === 0 ? (
						<div className="text-center py-4">No drivers found</div>
					) : (
						<RadioGroup
							value={selectedDriver}
							onValueChange={setSelectedDriver}
							className="gap-4"
						>
							{drivers?.data.map((driver: any) => (
								<div
									key={driver.publicId}
									className="flex items-center space-x-4 p-4 rounded-lg border hover:bg-accent"
								>
									<RadioGroupItem
										value={driver.publicId}
										id={driver.publicId}
									/>

									<Label htmlFor={driver.publicId} className="flex-1">
										<div className="flex justify-between items-center">
											<div>
												<p className="font-medium">
													{driver.firstName} {driver.lastName}
												</p>
												<p className="text-sm text-muted-foreground">
													{driver.email}
												</p>
											</div>
											<span className="text-sm">{driver.phoneNumber}</span>
										</div>
									</Label>
								</div>
							))}
						</RadioGroup>
					)}
				</div>

				<div className="flex justify-end gap-2 pt-4">
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<Button
						variant="primary"
						onClick={handleAssignDriver}
						disabled={!selectedDriver || isLoading}
					>
						Assign Driver
					</Button>
				</div>
			</AlertDialogContent>
		</AlertDialog>
	);
}
