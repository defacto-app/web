"use client";
import { Map, Navigation } from "lucide-react";
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
  const [savedAddress, setSavedAddress] = useState("");

  const handleAddressSelection = (address: string) => {
    setSelectedAddress(address);
  };

  const handleSaveChanges = () => {
    setSavedAddress(selectedAddress);
  };

  return (
    <div className="relative w-full">
      <Dialog>
        <DialogTrigger asChild>
          <div className="relative mb-8 w-full cursor-pointer">
            <input
              type="text"
              placeholder={savedAddress ? savedAddress : "What's your address?"}
              className="w-full p-4 pr-16 border border-gray-300 rounded-full"
            />
            <button className="absolute right-0 top-0 mt-3 mr-4" disabled>
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg> */}
              <div className="grid justify-items-center place-content-center">
              <Navigation className="text-primary-500 items-center"/>

              </div>

            </button>
          </div>
        </DialogTrigger>
        <DialogContent id="dialog-trigger" className="sm:max-w-[700px] p-20 sm:max-h-[700px]">
          <svg
            className="absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
                width={200}
                height={200}
                x="50%"
                y={-1}
                patternUnits="userSpaceOnUse"
              >
                <path d="M.5 200V.5H200" fill="none" />
              </pattern>
            </defs>
            <svg x="50%" y={-1} className="overflow-visible fill-gray-800/20">
              <path
                d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                strokeWidth={0}
              />
            </svg>
            <rect width="100%" height="100%" strokeWidth={0} fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)" />
          </svg>

          <DialogHeader>
            <DialogTitle className="text-center text-primary-600 text-2xl sm:text-2xl">
              Add new address
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
              </Button>
            </div>
          </div>
          {/* Past Delivery addresses */}
          <PastAddresses onSelect={handleAddressSelection} />
          <div className="grid place-content-center">
            <DialogFooter className="">
              <Button type="button" variant="primary" onClick={handleSaveChanges}>
                Save changes
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
