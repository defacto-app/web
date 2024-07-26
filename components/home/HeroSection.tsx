import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { BikeIcon } from "lucide-react";

export default function HeroSection() {
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
      <Image
        className="h-12"
        src={logo.src}
        alt={logo.alt}
        width={100}
        height={100}
        style={{
          width: "100%",
          height: "auto",
          maxWidth: "100%",
          height: "auto"
        }} />
    </div>
  ));

  return (
    <div className="relative isolate overflow-hidden bg-white">
      <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
            width={200}
            height={200}
            x="50%"
            y={-1}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          strokeWidth={0}
          fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
        />
      </svg>
      <div className="container pb-10 pt-10 sm:pb-10 lg:flex lg:px-8 lg:py-4">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
          <div className="mt-24 sm:mt-32 lg:mt-16">
            <a href="#" className="inline-flex space-x-6">
              <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600">
                <span>Riders Available</span>
                <BikeIcon className="text-primary-600" />
              </span>
            </a>
          </div>
          <h1 className="mt-10 text-4xl font-bold tracking-tight text-primary-600 sm:text-6xl">
            Delivering Convenience, One Order at a Time.
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Whether it's a piping hot meal from your favorite restaurant,
            essentials from the store, or documents urgently needed across town,
            we've got you covered.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Button className="py-5 px-10" variant="primary">
              <p>Send Package Swiftly!</p>
            </Button>
          </div>
        </div>
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
  <div className="max-w-full sm:max-w-md flex-none  lg:max-w-none">
    <div className="lg:p-4">
      <div className="grid justify-items-center">
        <Image
          className="object-cover w-full h-auto"
          src="/heroimage.svg"
          alt="rider vector"
          width={1000}
          height={1000}
          style={{
            maxWidth: "100%",
            height: "auto"
          }} />
      </div>
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
  );
}
