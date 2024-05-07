import Image from "next/image";
import React from "react";
import { ArrowRightIcon, CircleArrowRight } from "lucide-react";
import Link from "next/link";

export default function HeroImage() {
  return (
    <div className="bg-primary-200">
      <div className="container mx-auto py-10">
        <Link href="/user/send-package">
          <div className="grid grid-cols-12 items-center">
            <div className="col-span-12 md:col-span-6 lg:col-span-5 p-4 md:p-6 lg:p-8">
              <h1 className="text-4xl sm:text-4xl md:text-2xl lg:text-2xl text-primary-600 font-bold mb-4">
                Send Package
              </h1>
              <p className="text-base sm:text-base md:text-base lg:text-base text-gray-700 mb-5">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero
                debitis molestias
              </p>
              <ArrowRightIcon className="text-primary-900 bg-white text-lg rounded-full font-bold" />
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
