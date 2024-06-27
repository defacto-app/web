import { ChevronRight } from "lucide-react";
import React from "react";
import PickupModal from "../user/PickupModal";
import { Button } from "../ui/button";
import Image from "next/image";

function FoodHero() {
  return (
    <div>
      <main>
        <div className="bg-gray-900 pt-10 sm:pt-16 lg:overflow-hidden lg:pb-14 lg:pt-8">
          <div className="mx-auto max-w-7xl ">
            <div className="lg:grid lg:grid-cols-9">
              <div className="mx-auto max-w-md px-6 col-span-3 sm:max-w-2xl sm:text-center lg:flex lg:items-center lg:px-0 lg:text-left">
                <div
                  className="lg:py-24 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: "url('/hero/bg1.png')" }}
                >
                  <div className="hidden sm:mb-5 sm:flex sm:justify-center lg:justify-start">
                    <a
                      href="#"
                      className="flex items-center rounded-full bg-white p-1 pr-2 text-white hover:text-gray-200 sm:text-base lg:text-sm xl:text-base"
                    >
                      <span className="rounded-full text-primary-500 px-3 py-0.5 text-sm font-semibold leading-5 ">
                        Order from Restaurant
                      </span>
                      <span className="ml-4 text-sm text-gray-800">
                        Visit our careers page
                      </span>
                      <ChevronRight
                        className="ml-2 h-5 w-5 text-gray-500"
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                  <h1 className="text-3xl font-bold tracking-tight text-gray-800 sm:text-6xl lg:mt-6 xl:text-6xl">
                    <span className="block text-primary-600">
                      Feast your Senses
                    </span>
                    <span className="block text-primary-400">
                      Fast and Fresh
                    </span>
                  </h1>
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

              <div className="-mb-16  mt-12 ml-10 sm:-mb-48 lg:relative col-span-3 lg:m-0">
                <div className="absolute inset-y-0 left-0 h-full w-full">
                  <Image
                    src="/hero/bg1.png"
                    alt="Background"
                    className="h-full w-full object-cover opacity-95"
                    width={1000}
                    height={1000}
                  />
                </div>
                <div className=" mx-auto ml-24 max-w-md px-6 sm:max-w-2xl lg:max-w-none lg:px-0  ">
                  <Image
                    src="/hero/bg2.png"
                    alt="Foreground"
                    className="w-full lg:absolute lg:inset-y-0 lg:h-full lg:w-auto lg:max-w-none"
                    width={1000}
                    height={1000}
                  />
                </div>
              </div>
              <div className="col-span-3 grid justify-items-center bg-primary-600 w-full rounded-tl-full">
                {/* <div className="bg-black grid justify-items-start rounded-r-full mt-44 w-[400px] h-11">
                  <h1 className="text-gray-200 mr-10 text-xl font-semibold">
                  Personlised and Instant
                  </h1>
                </div> */}
                <div className="px-4 ml-20">
                  <h1 className="lg:px-3 font-bold text-4xl mt-44 grid justify-items-center text-gray-100">
                    Download the Defacto App for faster ordering{" "}
                  </h1>{" "}

                </div>
                <div className="mb-20 flex justify-center gap-x-6 lg:justify-start">

                  <Button size="lg" variant="secondary">
                    <div>
                      <Image
                        className="mr-2 h-6 w-6"
                        src="/hero/apple3.png"
                        alt=""
                        height={50}
                        width={154}
                      />
                    </div>
                    <div>
                      <h1 className="text-xs font-light">Download on </h1>
                      <div className="font-semibold">Apple Store</div>
                    </div>
                  </Button>
                  <Button className="py-4 " size="lg" variant="secondary">
                    <div>
                      <Image
                        className="mr-2 h-6 w-6"
                        src="/hero/android3.png"
                        alt=""
                        height={50}
                        width={154}
                      />
                    </div>
                    <div>
                      <h1 className="text-xs font-light">Download on </h1>
                      <div className="font-semibold">Play Store</div>
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
