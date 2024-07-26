import { ChevronRight } from "lucide-react";
import React from "react";
import PickupModal from "../user/PickupModal";
import { Button } from "../ui/button";
import Image from "next/image";
import { Typewriter } from "./Typewriter";
import RotateBetween from "./RotataBetween";

function FoodHero() {
  const texts = [
    "cravings are delivered",
    "We Deliver",
    "Order with speed",
    "Order with ease",
  ];
  const words = [
    "cravings are delivered",
    "We Deliver",
    "Order with speed",
    "Order with ease",
  ];
  return (
    <div>
      <main>
        <div className="bg-[#03081F] pt-10 sm:pt-16 lg:overflow-hidden lg:pb-14 lg:pt-8">
          <div className="  sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 gap-6">
              <div className="max-w-md col-span-1 sm:max-w-2xl sm:text-center lg:flex lg:items-center lg:px-0 lg:text-left">
                <div>
                  <div className="sm:flex sm:justify-center lg:justify-start mb-5 sm:mb-0">
                    <a
                      href="#"
                      className="flex items-center rounded-full p-1 pr-2 text-white hover:text-gray-200 sm:text-base lg:text-sm xl:text-base"
                    >
                      <span className="text-primary-50 px-3 py-0.5 text-sm font-semibold leading-5">
                        Order from Restaurant
                      </span>
                      <span className="ml-4 text-sm text-gray-100">
                        or Send a Package!
                      </span>
                      <ChevronRight
                        className="ml-2 h-5 w-5 text-gray-200"
                        aria-hidden="true"
                      />
                    </a>
                  </div>

                  <div className="py-2">
                    <div className="flex h-20 items-center justify-start space-x-1 px-2 text-4xl font-normal text-primary-600 dark:text-gray-300">
                      <p>Contribute us to</p>
                      <RotateBetween
                        words={words}
                        className="text-balance  from-primary-500 from-30% to-primary-300/60 bg-clip-text px-1 py-2 font-bold leading-none tracking-tighter dark:from-white dark:to-white/40"
                      />
                    </div>
                    {/* <Typewriter texts={texts} delay={1} baseText="At Defacto, " /> */}
                    <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                      Enter your address to see what we deliver
                    </p>
                    <div className="mt-10 sm:mt-12">
                      <form
                        action="#"
                        className="sm:mx-auto sm:max-w-xl lg:mx-0"
                      >
                        <div className="sm:flex">
                          <div className="min-w-0 flex-1">
                            <label htmlFor="email" className="sr-only">
                              Email address
                            </label>
                            <PickupModal />
                          </div>
                          <div className="mt-3 sm:ml-3 sm:mt-0">
                            <Button
                              variant="primary"
                              type="submit"
                              className="block w-full rounded-md px-4 py-3 font-medium text-white shadow focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2 focus:ring-offset-gray-900"
                            >
                              Make your order!
                            </Button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-1 grid grid-cols-3 justify-items-center bg-primary-600 lg:rounded-tl-full lg:mt-0 mt-12 lg:py-0 py-8">
                <div className="relative col-span-1  mt-12 lg:m-0">
                  <Image
                    src="/hero/bg2.png"
                    alt="Foreground"
                    className="w-full lg:absolute lg:inset-y-0 lg:h-full lg:w-auto lg:max-w-none"
                    width={1000}
                    height={1000}
                    priority
                    style={{
                      maxWidth: "100%",
                      height: "auto"
                    }} />
                </div>
               <div className="flex">
               <div className="px-4 col-span-1 lg:ml-20 ml-4">
                  <h1 className="lg:px-3 mt-20 font-bold py-3 inline-block text-xl text-gray-900 text-center">
                    Download the Defacto App for faster ordering
                  </h1>
                </div>
                <div className="lg:mb-20 col-span-1 mb-10 flex flex-col lg:flex-row justify-center gap-x-6 lg:justify-start">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="mb-4 lg:mb-0 bg-gray-900 text-white"
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
                        }} />
                      <div>
                        <h1 className="text-xs font-light">Download on</h1>
                        <div className="font-semibold">Apple Store</div>
                      </div>
                    </div>
                  </Button>
                  <Button
                    size="lg"
                    variant="secondary"
                    className="mb-4 lg:mb-0 bg-gray-900 text-white"
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
                        }} />
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
          </div>
        </div>

      </main>
    </div>
  );
}

export default FoodHero;
