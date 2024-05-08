import DeliveryFee from "@/components/user/DeliveryFee";
import PaymentModal from "@/components/user/PaymentModal";
import {
  ChevronRight,
  LocateFixedIcon,
  LocateIcon,
  MapIcon,
  UserIcon,
} from "lucide-react";
import Image from "next/image";
import React from "react";


export default function page() {
  return (
    <div>
      <div className="grid bg-white grid-cols-10">
        {/* video side */}
        <div className="col-span-4   flex flex-col justify-end">

          <div>
          <Image
                className="object-contain max-w-full max-h-full"
                src="/dispatch3.png"
                alt="team"
                width={1500}
                height={2500}
              />
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
            <div className="grid grid-cols-10 gap-x-3 container">
              <div className="col-span-5">
                <div>
                  <div className="bg-primary-300 p-5 rounded-lg mb-4 mt-4">
                    <h1 className=" font-semibold text-xl">Pickup Details</h1>
                  </div>
                  <div className="bg-[#FFFBFE] mb-4 mt-2">
                    <div className="grid grid-cols-3 items-center ">
                      <div className="">
                        <UserIcon />
                      </div>
                      <div>
                        <h1 className="font-semibold text-xl">Sender</h1>
                        <p>Username</p>
                        <p>UserPhone</p>
                        <p>UserEmail</p>
                      </div>
                      <div>
                        <PaymentModal/>
                      </div>
                    </div>
                  </div>{" "}
                  <div className="bg-[#FFFBFE] mb-4 mt-2">
                    <div className="grid grid-cols-3 items-center ">
                      <div className="">
                        <MapIcon />
                      </div>
                      <div>
                        <h1 className="font-semibold text-xl">
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
              </div>{" "}
              <div className="col-span-5">
                <div>
                  <div className="bg-primary-300 p-5 rounded-lg mb-4 mt-4">
                    <h1 className=" font-semibold text-xl">Drop-Off Details</h1>
                  </div>
                  <div className="bg-[#FFFBFE] mb-4 mt-2">
                    <div className="grid grid-cols-3 items-center ">
                      <div className="">
                        <UserIcon />
                      </div>
                      <div>
                        <h1 className="font-semibold text-xl">Receiver</h1>
                        <p>Username</p>
                        <p>UserPhone</p>
                        <p>UserEmail</p>
                      </div>
                      <div>
                        <ChevronRight />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[#FFFBFE] mb-4 mt-2">
                  <div className="grid grid-cols-3 items-center ">
                    <div className="">
                      <MapIcon />
                    </div>
                    <div>
                      <h1 className="font-semibold text-xl">Pickup Address</h1>
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
