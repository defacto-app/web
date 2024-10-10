"use client"
import {BikeIcon} from "lucide-react";
import React, {useEffect, useState} from "react";
import {Button} from "../ui/button";
import Image from "next/image";
import RotateBetween from "./RotataBetween";
import PickupModal from "../user/PickupModal";
import Loader from "../Loader";
import {useAtomAuthContext} from "@/app/store/authAtom";

export default function FoodHero2() {
    const { currentStep,modalOpen, goBack } = useAtomAuthContext();

    const words = [
        "Cravings",
        "Joy",
        "Orders with speed",
        "Orders with ease",
    ];

    const logos = [
        {
            src: "https://tailwindui.com/img/logos/tuple-logo-gray-400.svg",
            alt: "Tuple",
        },
        {
            src: "https://tailwindui.com/img/logos/mirage-logo-gray-400.svg",
            alt: "Mirage",
        },
        {
            src: "https://tailwindui.com/img/logos/statickit-logo-gray-400.svg",
            alt: "StaticKit",
        },
        {
            src: "https://tailwindui.com/img/logos/transistor-logo-gray-400.svg",
            alt: "Transistor",
        },
        {
            src: "https://tailwindui.com/img/logos/workcation-logo-gray-400.svg",
            alt: "Workcation",
        },
    ];


    const logoElements = logos.map((logo, index) => (
        <div
            className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1"
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={index}
        >
            <Image
                className="h-12"
                src={logo.src}
                alt={logo.alt}
                width={100}
                height={100}
                style={{
                    width: "100%",
                    maxWidth: "100%",
                    height: "auto"
                }}/>
        </div>
    ));
    const [selectedAddress, setSelectedAddress] = useState("");
    const handleAddressSelect = (address: string) => {
        setSelectedAddress(address);

        console.log(address, "address");
        // You can also perform any other actions with the selected address here
    };

    // get address from local storage

    useEffect(() => {
        const savedAddresses = JSON.parse(sessionStorage.getItem('selectedAddresses') || '[]');
        const lastAddress = savedAddresses.length > 0 ? savedAddresses[savedAddresses.length - 1] : "";

        setSelectedAddress(lastAddress);
    }, []);
    return (
        <div className="">
            <div className="flex flex-col lg:flex-row items-center justify-between">
                <div className="max-w-2xl mb-10 lg:mb-0 px-10">
                    <p className="inline-flex space-x-6 mb-8">
           <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600">
             <span>Riders Available</span>

             <BikeIcon className="text-primary-600"/>
           </span>
                    </p>
                    <h1 className="text-4xl lg:text-5xl font-bold text-blue-900 mb-4">
                        Delivering
                        <RotateBetween
                            words={words}
                            className="text-balance  from-primary-500 from-30% to-primary-300/60 bg-clip-text px-1 py-2 font-bold leading-none tracking-tighter dark:from-white dark:to-white/40"
                        />
                    </h1>
                    <p className="text-base lg:text-lg text-gray-700 mb-8">
                        Bringing happiness to your doorstep, one delivery at a time. We
                        deliver, you enjoy.
                    </p>
                    <div>
                        <PickupModal handleOnSelect={handleAddressSelect}/>
                        <p>Selected Address: {selectedAddress}</p>
                    </div>
                </div>

                <div className="relative bg-primary-900 lg:rounded-tl-full lg:w-1/2 w-full">
                    <Image
                        src="/hero/hero.png"
                        alt="Foreground"
                        className="w-full h-auto"
                        width={500}
                        height={500}
                        priority
                        style={{
                            maxWidth: "100%",
                            height: "auto"
                        }}/>
                    <div className="absolute inset-0 flex flex-col items-center justify-center lg:items-end p-4 lg:p-8">
                        <h2 className="text-lg text-gray-100 w-full lg:w-56 text-center lg:text-end font-semibold mb-4 lg:mb-8">
                            Download the Defacto app for faster ordering
                        </h2>
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
                                            height: "auto"
                                        }}/>
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
                                            height: "auto"
                                        }}/>
                                    <div>
                                        <h1 className="text-xs font-light">Download on</h1>
                                        <div className="font-semibold">Play Store</div>
                                    </div>
                                </div>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
         {/*   <div className="container">
                <div className="  py-16 ">
                    <p className="text-start text-base font-semibold text-gray-500">
                        Trusted by over 30+ businesses
                    </p>
                    <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
                        {logoElements}
                    </div>
                </div>
            </div>*/}
        </div>
    );
}
