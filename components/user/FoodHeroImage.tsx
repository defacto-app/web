import Image from "next/image";
import React from "react";
import { ArrowRightIcon, CircleArrowRight } from "lucide-react";
import Link from "next/link";

export default function FoodHeroImage() {
  return (
    <div className="bg-primary-700 rounded-xl w-[600px] h-[300px]">
      <div className="container mx-auto py-10">
        <Link href="/user/send-package">
          <div className="grid grid-cols-12 items-center">
            <div className="col-span-12 md:col-span-6 lg:col-span-5 p-4 md:p-6 lg:p-8">
              <h1 className="text-4xl sm:text-4xl md:text-2xl lg:text-2xl text-primary-200 font-bold mb-4">
                Coming Soon
              </h1>
              <p className="text-base sm:text-base md:text-base lg:text-base text-gray-200 mb-5">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.fwiknf nsaious
              </p>
              <div className="bg-primary-200 rounded-xl w-10 grid place-items-center h-8">
              <ArrowRightIcon className="text-primary-600  text-3xl  font-bold " />

              </div>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-7">
              <Image
                className="object-contain max-w-full max-h-full"
                src="/user/package.svg"
                alt="team"
                width={1500}
                height={1500}
              />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
