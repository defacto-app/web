"use client";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "../ui/input";
import { toast } from "@/components/ui/use-toast";
import { Label } from "../ui/label";
import Calender from "../user/Calender";
import DropoffModal from "../user/DropoffModal";
import DeliveryFee from "../user/DeliveryFee";
import PhoneLogin from "@/app/components/PhoneLogin";
import {
	DateField,
	DateInput,
	DateSegment,
	TimeField,
} from "react-aria-components";
import DateTimePicker from "@/components/user/DateTimePicker";

const FormSchema = z.object({
	bio: z
		.string()
		.min(10, {
			message: "Message must be at least 10 characters.",
		})
		.max(160, {
			message: "Message must not be longer than 30 characters.",
		}),
});

export default function DropOffInformation() {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		toast({
			title: "You submitted the following values:",
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		});
	}

	return (
		<div className="container mx-auto px-4  ">
			<div className="py-4 bg-gray-100 p-4 rounded-lg shadow-gray-500  text-start  ">
				<h1 className="sm:text-xl  font-semibold text-lg text-primary-600">
					Sender Information
				</h1>
			</div>

			<div className="flex mt-4 items-center space-x-2 mb-6">
				<Checkbox id="info" />
				<label
					htmlFor="info"
					className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
				>
					Use my account Information
				</label>
			</div>

			<div>
				<div className="mb-4">
					<Label htmlFor="name" className="block text-lg font-semibold mb-2">
						Full Name
					</Label>
					<Input
						id="name"
						name="full-name"
						type="name"
						placeholder="e.g Olusegun Obasanjo"
						required
					/>
				</div>
				<DateTimePicker  showTimeSelect={true} date={new Date()}  />
				<div className="mb-4">
					<Label htmlFor="number" className="block text-lg font-semibold mb-2">
						Phone Number
					</Label>
					<div className={`flex items-center gap-x-2`}>
						<div className={`border py-2 px-3 rounded-full flex`}>
							<span>🇳🇬</span>
							<span>+234</span>
						</div>
						<Input className="md:w-full" />
					</div>
				</div>
			</div>
			<div className={`flex items-center`}>
				<div>
					<Calender />
				</div>
				<TimeField className="space-y-2">
					<Label className="text-sm font-medium text-foreground">
						Time input with end icon
					</Label>
					<div className="relative">
						<DateInput className="relative inline-flex h-9 w-full items-center overflow-hidden whitespace-nowrap rounded-lg border border-input bg-background px-3 py-2 pe-9 text-sm shadow-sm shadow-black/[.04] ring-offset-background transition-shadow data-[focus-within]:border-ring data-[disabled]:opacity-50 data-[focus-within]:outline-none data-[focus-within]:ring-2 data-[focus-within]:ring-ring/30 data-[focus-within]:ring-offset-2">
							{(segment) => (
								<DateSegment
									segment={segment}
									className="inline rounded p-0.5 text-foreground caret-transparent outline outline-0 data-[disabled]:cursor-not-allowed data-[focused]:bg-accent data-[invalid]:data-[focused]:bg-destructive data-[type=literal]:px-0 data-[focused]:data-[placeholder]:text-foreground data-[focused]:text-foreground data-[invalid]:data-[focused]:data-[placeholder]:text-destructive-foreground data-[invalid]:data-[focused]:text-destructive-foreground data-[invalid]:data-[placeholder]:text-destructive data-[invalid]:text-destructive data-[placeholder]:text-muted-foreground/70 data-[type=literal]:text-muted-foreground/70 data-[disabled]:opacity-50"
								/>
							)}
						</DateInput>
						<div className="pointer-events-none absolute inset-y-0 end-0 z-10 flex items-center justify-center pe-3 text-muted-foreground/80">
							<Clock size={16} strokeWidth={2} aria-hidden="true" />
						</div>
					</div>
				</TimeField>
			</div>
		</div>
	);
}

// Dependencies: npm install react-aria-components
