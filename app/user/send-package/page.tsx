"use client";
import DeliveryFee from "@/components/user/DeliveryFee";
import ReceiverInfo from "@/components/user/ReceiverInfo";
import DropOffInformation from "@/components/delivery/DropOffInformation";
import WelcomeUser from "@/components/user/WelcomeUser";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import DateTimePicker from "@/components/user/DateTimePicker";
import GoogleAutoComplete from "@/components/GoogleAutoComplete";
import { useAtom } from "jotai/index";
import { packagePayloadAtom } from "@/app/store/sendPackageAtom";

export default function Page() {
	const [packagePayload, setPackagePayload] = useAtom(packagePayloadAtom);
	const [pickupDate, setPickupDate] = useState(new Date());

	const handleInputChange = (e: { target: any }) => {
		const { name, value } = e.target;
		setPackagePayload((prev) => ({
			...prev,
			senderDetails: {
				...prev.senderDetails,
				[name]: value,
			},
		}));
	};

	const setDropOffAddress = (e: { target: any }) => {
		const { name, value } = e.target;
		setPackagePayload((prev) => ({
			...prev,
			receiverDetails: {
				...prev.receiverDetails,
				[name]: value,
			},
		}));
	};

	const handleDateSelect = (selectedDate: any) => {
		setPickupDate(selectedDate);
		setPackagePayload((prev) => ({
			...prev,
			senderDetails: {
				...prev.senderDetails,
				pickupTime: selectedDate,
			},
		}));
	};

	useEffect(() => {
		console.log(packagePayload);
	}, [packagePayload]);

	return (
		<div>
			<div className="container mx-auto px-4">
				{/* <div className='w-full bg-primary-600'>
      <WelcomeUser/>

      </div> */}

				<h1 className="text-start px-1 py-4 text-primary-600 text-3xl font-bold mt-5">
					Send Package
				</h1>
				<div className=" lg:grid lg:grid-cols-3  items-start">
					<div>
						<div className="container mx-auto p-2 ">
							<div className="container mx-auto px-4  space-y-4">
								<div>
									<Label className={`font-bold text-lg`}>
										What do you need to transport ?
									</Label>
									<Textarea
										placeholder={`briefly describe the item`}
										rows={7}
										value={packagePayload.description}
									/>
								</div>

								<div>
									<Label>Pickup Time</Label>
									<DateTimePicker
										showTimeSelect={true}
										selected={pickupDate}
										onSelect={handleDateSelect}
									/>
								</div>

								<div>
									<Label htmlFor="address">Pickup address</Label>

									<GoogleAutoComplete
										onAddressSelect={(address) =>
											handleInputChange({
												target: { name: "deliveryAddress", value: address },
											})
										}
									/>
								</div>

								<div className="mb-4">
									<Label htmlFor="address">Drop Off address</Label>

									<GoogleAutoComplete
										onAddressSelect={(address) =>
											setDropOffAddress({
												target: { name: "deliveryAddress", value: address },
											})
										}
									/>
								</div>

								<div>
									<Label>Additional Address Details</Label>
									<Textarea
										placeholder={`Enter building name, house number, floor, and any nearby landmarks`}
										value={packagePayload.receiverDetails.addressNotes}
									/>
								</div>
							</div>
						</div>
					</div>
					<div>
						<DropOffInformation />
					</div>
				</div>
			</div>
		</div>
	);
}
