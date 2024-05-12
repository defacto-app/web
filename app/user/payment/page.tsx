import DeliveryFee from "@/components/user/DeliveryFee";
import DropoffModal from "@/components/user/DropoffModal";
import PaymentOptions from "@/components/user/PaymentOptions";
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

  const truncateText = (text: string, maxLength: number): string => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };
  const senderAddress = "1234 Sender Street, City, Country";
  const receiverAddress = "5678 Receiver Street, City, Country";

  return (
    <div>
      <div className="grid  lg:grid-cols-10">
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

                      <div className="col-span-2">
                        <h1 className="font-semibold text-base">Sender Name</h1>
                        <p>Sender Call line</p>
                      </div>
                      <div className="col-span-1">
                        <SenderModal/>
                      </div>
                    </div>
                  </div>{" "}
                  <div className=" mb-4 mt-2">
                  <div className="bg-[#FFFBFB] mb-4 mt-2 p-10">
                    <div className="grid grid-cols-3 items-center justify-between ">

                      <div className="col-span-2">
                      <h1 className="font-semibold text-base">Pick Up Address</h1>
                          <p>{truncateText(senderAddress, 10)}</p>
                      </div>
                      <div className="col-span-1">
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
                  <div className="bg-[#FFFBFB] mb-4 mt-2 p-10">
                    <div className="grid grid-cols-3 items-center ">

                      <div className="col-span-2">
                        <h1 className="font-semibold text-base">Receiver</h1>
                        <p>UserPhone</p>
                      </div>
                      <div className="col-span-1">
                        <ReceiverModal/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[#FFFBFB] mb-4 mt-2 p-10">
                    <div className="grid grid-cols-3 items-center ">

                      <div className="col-span-2">
                      <h1 className="font-semibold text-base">Drop-Off Address</h1>
                        <p>{truncateText(receiverAddress, 10)}</p>

                      </div>
                      <div className="col-span-1">
                        <DropoffModal/>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
          <div className="grid place-content-center">
          <div className="bg-[#FFFBFB] mb-4 mt-2 p-10">
          <PaymentOptions/>

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
