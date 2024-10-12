import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { $api } from "@/http/endpoints";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
	AlertDialogAction,
	AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { useCartContext } from "@/app/store/cartAtom"; // Import the cart context

function UserAddresses() {
	const [data, setData] = React.useState<any>(null);
	const [modalOpen, setModalOpen] = React.useState(true);
	
	const [isLoading, setLoading] = React.useState<boolean>(true);
	const [selectedAddress, setSelectedAddress] = React.useState<any>(null);

	// Get the setSelectedAddress function from the cart context
	const { setSelectedAddress: setCartAddress } = useCartContext();

	useEffect(() => {
		const getData = async () => {
			setLoading(true);
			try {
				const res = await $api.auth.user.address.all();
				setLoading(false);
				setData(res.data);
			} catch (error) {
				setLoading(false);
			}
		};

		getData();
	}, []);

	const handleSelectAddress = (address: any) => {
		setSelectedAddress(address);
		setCartAddress(address); // Update the cart with the selected address
		setModalOpen(false); // Close the modal after selection
	};

	return (
		<div>
			<div className="bg-white p-6 rounded-lg border">
				<h2 className="text-lg font-semibold mb-2">Deliver to</h2>
				<div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
					<div className="flex items-center">
						<span className="text-blue-500 mr-4">📍</span>
						<div>
							{data && data.length > 0 ? (
								<div>
									<p className="font-semibold">
										<span className={`capitalize`}>{data[0].label} </span>
										<span className="text-sm text-blue-500">(Default)</span>
									</p>
									<p className="text-sm text-gray-500">
										<div className="flex">
											{data[0].street}, {data[0].city}
										</div>
									</p>
								</div>
							) : (
								<p>No address available</p>
							)}
						</div>
					</div>

					<AlertDialog>
						<AlertDialogTrigger className={`border py-2 rounded-full px-4  border-blue-500`}>
								Edit
						</AlertDialogTrigger>
						<AlertDialogContent className={` lg:h-[450px]`}>
							<AlertDialogHeader>
								<AlertDialogTitle>Manage Delivery Locations</AlertDialogTitle>

								<Button variant={`outline`}>New Address</Button>
								<AlertDialogDescription>
									{data && data.length > 0 ? (
										<div className="space-y-2 max-h-60 overflow-y-auto">
											{data.map((address: any, index: number) => (
												<div
													key={address.publicId}
													className="p-4 bg-gray-100 rounded-lg shadow-sm flex justify-between items-center"
												>
													<div>
														<div className="flex items-center mb-2">
															<span className="text-blue-500 mr-4">📍</span>
															<div>
																<p className="font-semibold">
																	<span className={`capitalize`}>
																		{address.label}
																	</span>
																</p>
															</div>
														</div>
														<p className="text-sm text-gray-500 mb-2">
															{address.street}, {address.city}, {address.state},{" "}
															{address.country} - {address.postalCode}
														</p>
													</div>
													<div className="flex justify-end">
														<Button
															variant="outline"
															className="text-blue-500 font-medium"
															onClick={() => handleSelectAddress(address)}
														>
															Select
														</Button>
													</div>
												</div>
											))}
										</div>
									) : (
										<p>No addresses available</p>
									)}
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</div>
			</div>
		</div>
	);
}

export default UserAddresses;
