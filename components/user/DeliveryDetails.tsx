"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "../ui/input";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import AddressSelectorModal from "./AddressSelectorModal";
import GoogleAddressInput from "@/components/GoogleAddressInput";

export default function DeliveryDetails() {
	const [date, setDate] = React.useState<Date>();
	const [dropOffAddress, setDropOffAddress] = useState("");
	const [pickupAddress, setPickupAddress] = useState("sss");
	const handlePickupAddressSelect = (address: string) => {
		console.log("pickup", address);
		setPickupAddress(address);
	};
	const handleDropOffAddressSelect = (address: string) => {
		setDropOffAddress(address);
	};

	return (
		<div className="container mx-auto px-4 ">
			<div className="py-4 bg-gray-100 px-4 rounded-lg shadow-gray-500 text-start">
				<h1 className="sm:text-xl font-semibold text-lg text-primary-600">
					Delivery Details
				</h1>
			</div>
			<div>
				<RadioGroup className="" defaultValue="default">
					<div className="flex items-center space-x-2 py-4">
						<RadioGroupItem value="pickup" id="r1" />
						<Label htmlFor="r1" className="block text-lg font-semibold">
							Pickup
						</Label>
					</div>

					<div className="flex items-center space-x-2 mb-4">
						<div>
							pick {JSON.stringify(pickupAddress)}
							<GoogleAddressInput onAddressSelect={handlePickupAddressSelect} />
						</div>
						{/*<AddressSelectorModal handleOnSelect={handlePickupAddressSelect} />*/}
					</div>
					<div className="flex items-center space-x-2 mb-4">
						<RadioGroupItem value="drop-off" id="r3" />
						<Label htmlFor="r3" className="block text-lg font-semibold">
							Drop-Off
						</Label>
					</div>
					drop {JSON.stringify(dropOffAddress)}
					<div className="flex items-center space-x-2 mb-4">
						<GoogleAddressInput onAddressSelect={handleDropOffAddressSelect} />
					</div>
				</RadioGroup>
				<div className="mb-4">
					<div>
						<div className="mb-4 mt-2">
							<Label
								htmlFor="calendar"
								className=" text-lg font-semibold mb-2 p-3 bg-gray-200 rounded-lg"
							>
								Schedule Delivery
							</Label>
						</div>
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant={"outline"}
									className={cn(
										"w-[280px] justify-start text-left font-normal",
										!date && "text-muted-foreground",
									)}
								>
									<CalendarIcon className="mr-2 h-4 w-4" />
									{date ? format(date, "PPP") : <span>Pick a date</span>}
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-0">
								<Calendar
									mode="single"
									selected={date}
									onSelect={setDate}
									initialFocus
								/>
							</PopoverContent>
						</Popover>
					</div>
				</div>
			</div>
		</div>
	);
}
