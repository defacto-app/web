"use client";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import Calender from "./Calender";
import PickupModal from "./PickupModal";
import DropoffModal from "./DropoffModal";
import DeliveryFee from "./DeliveryFee";

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

export default function SendPackage() {
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
    <div className="container mx-auto px-4 py-8 mt-6">
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
        <h1 className="text-lg mb-2 text-start font-semibold">Pickup Address</h1>
      {/*<PickupModal/>*/}

      </div><div>
        <h1 className="text-lg mt-5 mb-2 text-start font-semibold">Dropoff Address</h1>
      <DropoffModal/>

      </div>
<DeliveryFee/>
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
<Calender/>

    </div>
  );
}
