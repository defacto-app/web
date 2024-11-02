"use client"
import PickUpInformation from "@/components/delivery/PickUpInformation";
import DeliveryFee from "@/components/user/DeliveryFee";
import ReceiverInfo from "@/components/user/ReceiverInfo";
import SendPackage from "@/components/user/SendPackage";
import WelcomeUser from "@/components/user/WelcomeUser";
import React from "react";

export default function Page() {
	const [payload, setPayload] = React.useState({
		deliveryDetails: {
			pickup: {
				address: "Lifecamp Road",
				date: "YYYY-MM-DD",
				time: "HH:MM",
			},
			dropOff: {
				address: "",
				date: "YYYY-MM-DD",
				time: "HH:MM",
			},
		},
		senderInformation: {
			useAccountInformation: true,
			fullName: "Olusegun Obasanjo",
			phoneNumber: "+234XXXXXXXXXX",
		},
		receiverInformation: {
			fullName: "Receiver Name",
			phoneNumber: "+234XXXXXXXXXX",
			modeOfDelivery: "Car",
			additionalInformation: "Knock 3 times on the gate!",
		},
		deliveryFee: 0.0,
	});

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
						<PickUpInformation />
					</div>
					<div>
						<SendPackage />
					</div>
					<div>
						<ReceiverInfo />
					</div>
				</div>
				<div className="grid grid-cols-5">
					<div className="col-span-2"></div>
					<div className="col-span-3">
						<DeliveryFee />
					</div>
				</div>
			</div>
		</div>
	);
}
