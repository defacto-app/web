import DeliveryFee from "@/components/user/DeliveryFee";
import DropoffModal from "@/components/user/DropoffModal";
import PickupModal from "@/components/user/PickupModal";
import ReceiverModal from "@/components/user/ReceiverModal";
import SenderModal from "@/components/user/SenderModal";
import {
  ChevronRight,

  MapIcon,
  UserIcon,
} from "lucide-react";
import Image from "next/image";
import React from "react";


export default function page() {
  return (
    <div>
      <div className="grid  lg:grid-cols-10">
        {/* video side */}
        <div className="col-span-4 bg-[#FFFBFB] flex flex-col justify-end">

         <div className="relative">
         <div className="absolute bottom-1">
          <Image
                className="object-contain max-w-full h-[500px]"
                src="/dispatch.svg"
                alt="team"
                width={800}
                height={1000}
              />
          </div>
         </div>
        </div>

        {/* review & payment side */}
        <div className="col-span-6 bg-white container">
          <div className="">
            <div className="mb-4 mt-10 p-10">
              <h1 className="font-bold text-4xl sm:text-3xl">
                Review & Payment
              </h1>
            </div>
            <div className="grid lg:grid-cols-10 gap-x-3 container">
              <div className="col-span-5">
                <div>
                  <div className="bg-primary-600 p-5 rounded-lg mb-4 mt-4">
                    <h1 className=" font-semibold text-xl text-gray-200">Pickup Details</h1>
                  </div>
                  <div className="bg-[#FFFBFB] mb-4 mt-2 p-10">
                    <div className="grid grid-cols-3 items-center ">
                      <div className="">
                        <UserIcon className="text-primary-600"/>
                      </div>
                      <div>
                        <h1 className="font-semibold text-base">Sender</h1>
                        <p>Username</p>
                        <p>UserPhone</p>
                        <p>UserEmail</p>
                      </div>
                      <div>
                        <SenderModal/>
                      </div>
                    </div>
                  </div>{" "}
                  <div className=" mb-4 mt-2">
                  <div className="bg-[#FFFBFB] mb-4 mt-2 p-10">
                    <div className="grid grid-cols-3 items-center justify-between ">
                      <div className="">
                        <UserIcon className="text-primary-600"/>
                      </div>
                      <div>
                        <h1 className="font-semibold text-base">Pick Up Address</h1>
                       <p>Pick up address</p>
                      </div>
                      <div>
                        <PickupModal/>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
              </div>{" "}
              <div className="col-span-5">
                <div>
                  <div className="bg-primary-600 p-5 rounded-lg mb-4 mt-4">
                    <h1 className=" font-semibold text-xl text-gray-200">Drop-Off Details</h1>
                  </div>
                  <div className="bg-[#FFFBFB] mb-4 mt-2 p-3">
                    <div className="grid grid-cols-3 items-center ">
                      <div className="">
                        <UserIcon className="text-primary-600"/>
                      </div>
                      <div>
                        <h1 className="font-semibold text-xl">Receiver</h1>
                        <p>Username</p>
                        <p>UserPhone</p>
                        <p>UserEmail</p>
                      </div>
                      <div>
                        <ReceiverModal/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[#FFFBFB] mb-4 mt-2 p-3">
                    <div className="grid grid-cols-3 items-center ">
                      <div className="">
                        <MapIcon className="text-primary-600"/>
                        <DropoffModal/>
                      </div>
                      <div>
                        <h1 className="font-semibold text-lg">
                          Pickup Address
                        </h1>
                        <p>UserAddress</p>
                      </div>
                      <div>
                        <ChevronRight />
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
          <div className="container grid grid-cols-10">
        <div className="col-span-2"></div>
        <div className="col-span-8 p-20">
          <DeliveryFee />
        </div>
      </div>
        </div>
      </div>

    </div>
  );
}
