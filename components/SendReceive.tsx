import Image from "next/image";
import { Button } from "@/components/ui/button";
import React from 'react';
import { usePackageContext } from "@/app/provider/packages.context";

const SendReceive: React.FC = () => {
  const { setCurrentStep } = usePackageContext();

  const handleSubmit = () => {
    console.log("Send package");
  };

  const handleSendClick = () => {
    setCurrentStep("send");
  };

  return (
    <div>
      <div className="relative cursor-pointer mt-10">
        <div className="mx-auto max-w-7xl sm:px-4 lg:px-8">
          <button
            onClick={handleSendClick}
            className='w-full shadow-xl sm:overflow-hidden sm:rounded-2xl'
            type="submit"
          >
            <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
              <div className="absolute inset-0">
                <Image
                  className="object-cover w-full h-full object-center"
                  src="/sending.jpg"
                  alt="Background"
                  quality={100}
                  fill
                  sizes="100vw" />
                <div className="absolute inset-0 bg-secondary-700 mix-blend-multiply" />
              </div>
              <div className="relative px-6 py-10 sm:py-20 lg:px-8 ">
                <h1 className="text-center text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                  <span className="block text-gray-100">Send</span>
                  <span className="block text-primary-100">Package</span>
                </h1>
                <div className="grid place-content-center"></div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendReceive;
