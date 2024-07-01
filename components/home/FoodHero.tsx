import { ChevronRight } from "lucide-react";
import React from "react";
import PickupModal from "../user/PickupModal";
import { Button } from "../ui/button";
import Image from "next/image";
import { Typewriter } from "./Typewriter";

function FoodHero() {
  const texts = [
    "cravings are delivered",
    "We Deliver",
    "Order with speed",
    "Order with ease",
  ];
  return (
    <div>
      <main>
        <div className="bg-[#03081F] pt-10 sm:pt-16 lg:overflow-hidden lg:pb-14 lg:pt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-9 gap-6">
              <div className="max-w-md col-span-3 sm:max-w-2xl sm:text-center lg:flex lg:items-center lg:px-0 lg:text-left">
                <div>
                  <div className="sm:flex sm:justify-center lg:justify-start mb-5 sm:mb-0">
                    <a href="#" className="flex items-center rounded-full p-1 pr-2 text-white hover:text-gray-200 sm:text-base lg:text-sm xl:text-base">
                      <span className="text-primary-50 px-3 py-0.5 text-sm font-semibold leading-5">
                        Order from Restaurant
                      </span>
                      <span className="ml-4 text-sm text-gray-100">
                        or Send a Package!
                      </span>
                      <ChevronRight className="ml-2 h-5 w-5 text-gray-200" aria-hidden="true" />
                    </a>
                  </div>

                  <div className="py-2">
                    <Typewriter texts={texts} delay={1} baseText="At Defacto, " />
                    <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                      Enter your address to see what we deliver
                    </p>
                    <div className="mt-10 sm:mt-12">
                      <form action="#" className="sm:mx-auto sm:max-w-xl lg:mx-0">
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

              <div className="relative col-span-3 mt-12 lg:m-0">
                <div className="absolute inset-y-0 left-0 h-full w-full lg:block hidden">
                  <Image
                    src="/hero/bg1.png"
                    alt="Background"
                    className="h-full w-full object-cover opacity-95"
                    width={1000}
                    height={1000}
                  />
                </div>
                <div className="mx-auto ml-24 max-w-md px-6 sm:max-w-2xl lg:max-w-none lg:px-0">
                  <Image
                    src="/hero/bg2.png"
                    alt="Foreground"
                    className="w-full lg:absolute lg:inset-y-0 lg:h-full lg:w-auto lg:max-w-none"
                    width={1000}
                    height={1000}
                  />
                </div>
              </div>

              <div className="col-span-3 grid justify-items-center bg-primary-600 lg:rounded-tl-full lg:mt-0 mt-12 lg:py-0 py-8">
                <div className="bg-gray-900 w-full rounded-r-xl grid justify-items-center mb-4 mt-44">
                  <h1 className=" text-xl p-4 font-semibold underline text-primary-500"> Personialised  <span className="text-white">and Instant </span> </h1>
                </div>
                <div className="px-4 lg:ml-20 ml-4">
                  <h1 className="lg:px-3 font-bold py-3 inline-block text-xl text-gray-900 text-center">
                    Download the Defacto App for faster ordering
                  </h1>
                </div>
                <div className="lg:mb-20 mb-10 flex flex-col lg:flex-row justify-center gap-x-6 lg:justify-start">
                  <Button size="lg" variant="secondary" className="mb-4 lg:mb-0 bg-gray-900 text-white">
                    <div className="flex items-center">
                      <Image
                        className="mr-2 h-6 w-6"
                        src="/hero/apple3.png"
                        alt="Apple Store"
                        height={50}
                        width={154}
                      />
                      <div>
                        <h1 className="text-xs font-light">Download on</h1>
                        <div className="font-semibold">Apple Store</div>
                      </div>
                    </div>
                  </Button>
                  <Button size="lg" variant="secondary" className="mb-4 lg:mb-0 bg-gray-900 text-white">
                    <div className="flex items-center">
                      <Image
                        className="mr-2 h-6 w-6"
                        src="/hero/android2.png"
                        alt="Play Store"
                        height={50}
                        width={154}
                      />
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

        {/* More main page content here... */}
      </main>
    </div>
  );
}

export default FoodHero;
