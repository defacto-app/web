"use client";
import React from "react";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "../ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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

export default function ReceiverInfo() {
	const tabItems = [
		{
			value: "car",
			label: "Car",
			description:
				"Convenient delivery option for larger packages and bulkier items, ensuring safe and efficient transportation by road.",
		},
		{
			value: "bike",
			label: "Bike",
			description:
				"Swift and eco-friendly delivery solution ideal for smaller parcels and urban areas, offering quick navigation through traffic and narrow streets.",
		},
		{
			value: "boat",
			label: "Boat",
			description:
				"Specialized delivery service for coastal and water-accessible locations.",
		},
		{
			value: "plane",
			label: "Plane",
			description:
				"Expedited delivery method for long-distance and remote areas, ensuring timely deliveries across regions.",
		},
	];

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
		<div className="container mx-auto px-4 ">
			<div className="py-4 bg-gray-100 p-4 rounded-lg shadow-gray-500  text-start  ">
				<h1 className="sm:text-xl font-semibold text-lg text-primary-600">
					Receiver Information
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
			<div className="mb-6">
				<div className="mb-4 mt-4">
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
				<div className="mb-4">
					<Label htmlFor="number" className="block text-lg font-semibold mb-2">
						Phone Number
					</Label>
					<Input
						id="number"
						name="number"
						type="number"
						placeholder="090*******"
						required
					/>
				</div>
			</div>
			<div className="mb-5">
				<h1 className="text-lg font-semibold mb-2">Choose mode of Delivery</h1>
				<Tabs defaultValue="account" className="">
					<TabsList>
						{tabItems.map((item) => (
							<TabsTrigger key={item.value} value={item.value}>
								{item.label}
							</TabsTrigger>
						))}
					</TabsList>
					{tabItems.map((item) => (
						<TabsContent key={item.value} value={item.value}>
							{item.description}
						</TabsContent>
					))}
				</Tabs>
			</div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-full space-y-6"
				>
					<FormField
						control={form.control}
						name="bio"
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									{" "}
									<div className="block text-lg p-3 rounded-lg bg-gray-200 font-semibold mb-2">
										{" "}
										Additional Information{" "}
									</div>
								</FormLabel>
								<FormControl>
									<Textarea
										placeholder="e.g Knock 3 times on the gate!"
										className="resize-none"
										{...field}
									/>
								</FormControl>
								<FormDescription>
									You can go into a little detail.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
				</form>
			</Form>
		</div>
	);
}
