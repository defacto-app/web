import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
function MobileApp() {
	return (
		<div className={`container mx-auto`}>
			<div
				className={`grid grid-cols-2 items-center text-primary-600 font-bold`}
			>
				<div>
					<h3 className={`text-5xl`}>Simple Way To Order Your Food</h3>
					<div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
						<Button
							size="lg"
							variant="secondary"
							className="bg-gray-900 text-white"
						>
							<div className="flex items-center">
								<Image
									className="mr-2 h-6 w-6"
									src="/hero/apple3.png"
									alt="Apple Store"
									height={50}
									width={154}
									style={{
										maxWidth: "100%",
										height: "auto",
									}}
								/>
								<div>
									<h1 className="text-xs font-light">Download on</h1>
									<div className="font-semibold">Apple Store</div>
								</div>
							</div>
						</Button>
						<Button
							size="lg"
							variant="secondary"
							className="bg-gray-900 text-white"
						>
							<div className="flex items-center">
								<Image
									className="mr-2 h-6 w-6"
									src="/hero/android2.png"
									alt="Play Store"
									height={50}
									width={154}
									style={{
										maxWidth: "100%",
										height: "auto",
									}}
								/>
								<div>
									<h1 className="text-xs font-light">Download on</h1>
									<div className="font-semibold">Play Store</div>
								</div>
							</div>
						</Button>
					</div>
				</div>
				<Image
					alt={"defacto-app"}
					width={500}
					height={500}
					src="/home/defacto-app.png"
				/>
			</div>
		</div>
	);
}

export default MobileApp;
