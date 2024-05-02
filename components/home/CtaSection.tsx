import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

export default function CtaSection() {
  return (
   <div>
   <div className="bg-white">
      <div className="mx-auto max-w-7xl py-12 sm:px-6 sm:py-32 lg:px-8">
        <div className="relative isolate overflow-hidden  lg:rounded-xl bg-primary-600 px-6 lg:pt-10 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 ">
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
            aria-hidden="true"
          >
            <circle cx={512} cy={512} r={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
            <defs>
              <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg>
          <div className="mx-auto max-w-md pt-8 text-start lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Download Defacto App
              <br />
              Start using our app today.
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
            Download the Defacto Delivery app now and experience the ultimate convenience of getting your items delivered with just a few taps.
            </p>
            <div className="mt-10 flex  justify-start gap-x-6 lg:justify-start">
              {/* <a
                href="#"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Get started
              </a> */}
              <Button size="lg" variant= "secondary">
              <div>
                  <Image className="mr-2 h-6 w-6" src="/hero/apple3.png" alt="" height={50} width={154}/>
                </div>
                <div>
                  <h1 className="text-xs font-light">Download on </h1>
                  <div className="font-semibold">Apple Store</div>
                </div>

              </Button>
              <Button className="py-4" size="lg" variant= "secondary">
              <div>
                  <Image className="mr-2 h-6 w-6" src="/hero/android3.png" alt="" height={50} width={154}/>
                </div>
                <div>
                  <h1 className="text-xs font-light">Download on </h1>
                  <div className="font-semibold">Play Store</div>
                </div>

              </Button>
            </div>
          </div>
          <div className="relative mt-16 h-64 lg:mt-8">
            <Image
              className="absolute left-0 lg:top-28 top-0 w-[40rem] max-w-none rounded-md"
              src="/mobileapp.png"
              alt="App screenshot"
              width={824}
              height={1080}
            />
          </div>
        </div>
      </div>
    </div>
   </div>
  );
}
