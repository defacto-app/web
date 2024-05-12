"use client"
import { ChevronRightIcon, Map, Navigation } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "../ui/checkbox";
import PastAddresses from "./PastAddresses";

const demoAddresses = [
  "No 2 Asaba Street, Lagos",
  "15 Aba Road, Port Harcourt",
  "20 Enugu Crescent, Abuja",
];

export default function PickupModal() {
  const [selectedAddress, setSelectedAddress] = useState("");

  const handleAddressSelection = (address: string) => {
    setSelectedAddress(address);
  };

  return (
    <div className="">
      <Dialog>
        <DialogTrigger asChild>
          <p className="text-lg text-primary-600 font-semibold">Edit</p>
          {/* <ChevronRightIcon /> */}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[700px] p-20 sm:max-h-[700px]">
          <DialogHeader>
            <DialogTitle className="text-center text-primary-600 text-4xl sm:text-5xl">
              Sender Details
            </DialogTitle>
          </DialogHeader>
          <div>
            {/* Use Current Location */}
            <div className="flex items-center space-x-2">
              <Checkbox className="text-primary-600" id="terms" />
              <label
                htmlFor="location"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Use Current Location
              </label>
            </div>
            {/* Address Input */}
            <div className="mt-2 flex rounded-md shadow-sm">
              <div className="relative flex flex-grow items-stretch focus-within:z-10">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Map className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  name="address"
                  id="address"
                  className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 font-bold"
                  placeholder="No 2 Asaba Street"
                  autoComplete="address-line1"
                  value={selectedAddress}
                  onChange={(e) => setSelectedAddress(e.target.value)}
                />
              </div>
              {/* Find Button */}
              <Button
                type="button"
                className="relative rounded-r-full bg-primary-600 text-gray-200 -ml-px inline-flex items-center gap-x-1.5 px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                onClick={() => handleAddressSelection(selectedAddress)}
              >
                <Navigation className="-ml-0.5 h-5 w-5 text-gray-200" aria-hidden="true" />
                Find
              </Button>
            </div>
          </div>
          {/* Past Delivery addresses */}
          <PastAddresses onSelect={handleAddressSelection} />
          <div className="grid place-content-center">
            <DialogFooter>
              <Button type="submit" variant="primary">
                Save changes
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
