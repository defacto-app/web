import DeliveryDetails from "@/components/user/DeliveryDetails";
import DeliveryFee from "@/components/user/DeliveryFee";
import ReceiverInfo from "@/components/user/ReceiverInfo";
import SendPackage from "@/components/user/SendPackage";
import WelcomeUser from "@/components/user/WelcomeUser";
import React from "react";

export default function Page() {
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
						<DeliveryDetails />
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
