import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

export default function AboutHero() {
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
      key={index}
    >
      <Image className="h-12" src={logo.src} alt={logo.alt} width={100} height={100} style={{ width: "100%", height: "auto" }}/>
    </div>
  ));

  return (
    <div className="relative isolate overflow-hidden bg-white">

      <div className="container px-3 pb-10 pt-10 sm:pb-10 lg:flex lg:px-8 lg:py-10">
        <div className="mx-auto container max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">

          <h1 className="mt-10 text-4xl font-bold tracking-tight text-black sm:text-6xl">
         <span className="text-primary-600">Defacto: </span> Your Partner in Fast and Reliable Deliveries
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
          At Defacto, we understand the importance of timely and dependable deliveries in today's fast-paced world. Whether you're a business seeking efficient logistics solutions or an individual expecting a package, we are here to simplify your delivery experience.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Button className="py-5 px-24" variant="primary">
              <p>Send Package Swiftly!</p>
            </Button>
          </div>
        </div>
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none">
          <div className="max-w-3xl flex-none lg:max-w-none">
            <div className="  lg:p-4">
              <div className="grid justify-items-center">
               <Image
               src="/hero/delivery.png"
               alt='Delivery man'
               width={1000}
               height={1000}
               style={{ width: "100%", height: "auto" }}/>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
        <div className="  py-16 ">
          <p className="text-start text-base font-semibold text-gray-500">
            Trusted by over 30+ businesses
          </p>
          <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
            {logoElements}
          </div>
        </div>
      </div>
      </div>

    </div>
  );
}
