import React from "react";
import OrdersHistory from "@/components/user/OrdersHistory";
import WelcomeUser from "@/components/user/WelcomeUser";
import Image from "next/image";
import UserSheet from "@/components/user/UserSheet";

export default function OrderSection() {
	return (
		<div>
			<div className="container mx-auto px-4 bg-[#FFFBFE]">
				<WelcomeUser />

				<div className="grid lg:grid-cols-8 gap-4">
					<div className="lg:col-span-4">
						<div>
							<div>
								<div className="relative">
									<div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
										<div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
											<div className="absolute inset-0">
												<Image
													className="object-cover object-center"
													src="/foodbg.jpg"
													alt="Background"
													quality={100}
													fill
													sizes="100vw"/>
												<div className="absolute inset-0 bg-primary-500 mix-blend-multiply"/>
											</div>
											<div className="relative px-6 py-10 sm:py-20 lg:px-8 ">
												<h1 className="text-center text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
													<span className="block text-white">Order From</span>
													<span className="block text-primary-200">Any Restaurant</span>
												</h1>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="lg:col-span-4">
				   <UserSheet>
						<div className="relative cursor-pointer">
							<div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
								<div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
									<div className="absolute inset-0">
										<Image
											className="object-cover w-full h-full object-center"
											src="/box2.jpg"
											alt="Background"
											quality={100}
											fill
											sizes="100vw" />
										<div className="absolute inset-0 bg-primary-700 mix-blend-multiply" />
									</div>
									<div className="relative px-6 py-10 sm:py-20 lg:px-8 ">
										<h1 className="text-center text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
											<span className="block text-gray-100">Package</span>
											<span className="block text-primary-100">Delivery</span>
										</h1>
										<div className="grid place-content-center">

										</div>

									</div>
								</div>
							</div>
						</div>
					</UserSheet>
					</div>
				</div>
			</div>
			<OrdersHistory/>
		</div>
	);
}
