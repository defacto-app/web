"use client";
// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import React, {useState} from "react";
import {Button} from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {Checkbox} from "../ui/checkbox";
import PastAddresses from "./PastAddresses";
import {Input} from "@/components/ui/input";
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";
import {Label} from "@/components/ui/label";
import GoogleAddressInput from "@/components/GoogleAddressInput";
import { X } from 'lucide-react';
const demoAddresses = [
    "No 2 Asaba Street, Lagos",
    "15 Aba Road, Port Harcourt",
    "20 Enugu Crescent, Abuja",
];

export default function PickupModal() {
    const [selectedAddress, setSelectedAddress] = useState("");
    const [savedAddress, setSavedAddress] = useState("");

    const [modalOpen, setModalOpen] = useState(true);

    const handleAddressSelection = (address: string) => {
        setSelectedAddress(address);
    };

    const handleSaveChanges = () => {
        setSavedAddress(selectedAddress);
    };

    return (
        <div className="relative ">
            <AlertDialog defaultOpen={modalOpen} open={modalOpen} >
                <AlertDialogTrigger asChild>
                    <div className="relative mb-8  cursor-pointer">
                        <Input
                            onClick={() => setModalOpen(true)}
                            type="text"
                            placeholder={
                                savedAddress ? savedAddress : "What's your address ?"
                            }
                        />
                        <Button
                            variant={`primary`}
                            className="absolute right-0 top-0 mt-3 mr-4"
                            disabled
                        >
                            {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                            <svg
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
                            </svg>
                            <div className="grid justify-items-center place-content-center">
                                {/*<Navigation className="text-primary-500 items-center"/>*/}
                            </div>
                        </Button>
                    </div>
                </AlertDialogTrigger>

                <AlertDialogContent id="dialog-trigger" className={`h-[600px] max-w-3xl`}>

                    <button

                        onClick={() => setModalOpen(false)}

                        role={`button`} className={`absolute top-4 right-2 bg-gray-200 rounded-full p-2`}>
                        <X className={`w-4 h-4`} />
                    </button>
                    <AlertDialogTitle className={`text-center`}>
                        <span>Add a delivery address</span>
                    </AlertDialogTitle>
                    <VisuallyHidden>
                        <AlertDialogDescription/>
                    </VisuallyHidden>
                    <div className={`absolute top-20 px-10`}>
                        <div className={`flex items-center`}>
                            <GoogleAddressInput/>

                        </div>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
