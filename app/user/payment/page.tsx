"use client";

import DeliveryFee from "@/components/user/DeliveryFee";
import DropoffModal from "@/components/user/DropoffModal";
import PaymentModal from "@/components/user/PaymentModal";
import PickupModal from "@/components/user/PickupModal";
import ReceiverModal from "@/components/user/ReceiverModal";
import SenderModal from "@/components/user/SenderModal";
import { BanknoteIcon, CheckCircleIcon, CreditCardIcon } from "lucide-react";
import Image from "next/legacy/image";
import React, { useState } from "react";

export default function Paymentpage() {
  const truncateText = (text: string, maxLength: number): string => {
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };
  const senderAddress = "1234 Sender Street, City, Country";
  const receiverAddress = "5678 Receiver Street, City, Country";

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const handleSelectPaymentMethod = (paymentMethod: any) => {
    setSelectedPaymentMethod(paymentMethod);
  };

  return (
    <div>
      <div className="grid h-[750px] lg:grid-cols-10 overflow-hidden">
        <div className="col-span-4 bg-[#FFFBFB] flex flex-col justify-end overflow-auto">
          <div className="relative">
            <div className="">
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
        <div className="col-span-6 bg-[#FFFBFB] container overflow-auto">
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
                    <h1 className=" font-semibold text-xl text-gray-200">
                      Pickup Details
                    </h1>
                  </div>
                  <div className="bg-[#FFFBFB] mb-4 mt-2 p-10">
                    <div className="grid grid-cols-3 items-center ">
                      <div className="col-span-2">
                        <h1 className="font-semibold text-base">Sender Name</h1>
                        <p>Sender Call line</p>
                      </div>
                      <div className="col-span-1">
                        <SenderModal />
                      </div>
                    </div>
                  </div>{" "}
                  <div className=" mb-4 mt-2">
                    <div className="bg-[#FFFBFB] mb-4 mt-2 p-10">
                      <div className="grid grid-cols-3 items-center justify-between ">
                        <div className="col-span-2">
                          <h1 className="font-semibold text-base">
                            Pick Up Address
                          </h1>
                          <p>{truncateText(senderAddress, 10)}</p>
                        </div>
                        <div className="col-span-1">
                          <PickupModal />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>{" "}
              <div className="col-span-5">
                <div>
                  <div className="bg-primary-600 p-5 rounded-lg mb-4 mt-4">
                    <h1 className=" font-semibold text-xl text-gray-200">
                      Drop-Off Details
                    </h1>
                  </div>
                  <div className="bg-[#FFFBFB] mb-4 mt-2 p-10">
                    <div className="grid grid-cols-3 items-center ">
                      <div className="col-span-2">
                        <h1 className="font-semibold text-base">Receiver</h1>
                        <p>UserPhone</p>
                      </div>
                      <div className="col-span-1">
                        <ReceiverModal />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[#FFFBFB] mb-4 mt-2 p-10">
                  <div className="grid grid-cols-3 items-center ">
                    <div className="col-span-2">
                      <h1 className="font-semibold text-base">
                        Drop-Off Address
                      </h1>
                      <p>{truncateText(receiverAddress, 10)}</p>
                    </div>
                    <div className="col-span-1">
                      <DropoffModal />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid place-content-center">
            <div className="bg-[#FFFBFB] mb-4 mt-2 py-10 px-4 w-96">
              <PaymentModal />
              {/* <div>
                <div>
                  <div className="bg-[#FFFBFB] sm:max-w-[425px] rounded-xl">
                    <div>
                    <div className="bg-primary-600 p-5 rounded-lg mb-4 mt-4">
                    <h1 className=" font-semibold text-xl text-gray-200">
                      Payment
                    </h1>
                  </div>
                    </div>
                    <div>
                      <div
                        className={`grid grid-cols-6 bg-white rounded-xl mb-5 mt-2 p-4 ${
                          selectedPaymentMethod === "cash"
                            ? "ring ring-primary-600"
                            : ""
                        }`}
                        onClick={() => handleSelectPaymentMethod("cash")}
                      >
                        <div className="col-span-1">
                          <BanknoteIcon className="text-primary-600" />
                        </div>
                        <div className="col-span-4">
                          <h1>Pay with Cash</h1>
                        </div>
                        <div className="col-span-1">
                          {selectedPaymentMethod === "cash" && (
                            <CheckCircleIcon className=" text-primary-600" />
                          )}
                        </div>
                      </div>
                      <div
                        className={`grid grid-cols-6 bg-white rounded-xl mb-5 mt-2 p-4 ${
                          selectedPaymentMethod === "card"
                            ? "ring ring-primary-600"
                            : ""
                        }`}
                        onClick={() => handleSelectPaymentMethod("card")}
                      >
                        {" "}
                        <div className="col-span-1">
                          <CreditCardIcon className="text-primary-600" />
                        </div>
                        <div className="col-span-4">
                          <h1>Pay with Card</h1>
                        </div>
                        <div className="col-span-1">
                          {selectedPaymentMethod === "card" && (
                            <CheckCircleIcon className=" text-primary-600" />
                          )}
                        </div>
                      </div>
                    </div>{" "}
                  </div>
                </div>
              </div> */}

            </div>
          </div>
          <div className="container grid lg:grid-cols-10">
            {/* <div className="col-span-2"></div> */}
            <div className="col-span-10 p-20">
              <DeliveryFee />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
