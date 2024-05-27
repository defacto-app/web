import Image from "next/image";
import React from "react";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import PaymentSheet from "./PaymentSheet";

export default function HeroImage() {
  return (
    <div className="bg-primary-200 rounded-xl w-full max-w-6xl mx-auto py-10 px-4">
      <div className="container mx-auto">
        <Link href="/user/send-package">
          <div className="grid grid-cols-12 items-center gap-4">
            <div className="col-span-12 md:col-span-6 lg:col-span-5 p-4 md:p-6 lg:p-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl text-primary-600 font-bold mb-4">
                Send Package
              </h1>
              <p className="text-base sm:text-base md:text-lg lg:text-lg text-gray-700 mb-5">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit...
              </p>
              <div className="bg-white rounded-xl w-10 h-10 flex justify-center items-center">
                <ArrowRightIcon className="text-primary-600 text-3xl font-bold" />
              </div>
            </div>
            <PaymentSheet />
            <div className="col-span-12 md:col-span-6 lg:col-span-7 flex justify-center items-center">
              <div className="w-full max-w-md">
                <Image
                  className="object-contain"
                  src="/user/package.svg"
                  alt="team"
                  width={600}
                  height={600}
                  layout="responsive"
                />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
