"use client"
import Image from "next/image";
import React from "react";
import { ArrowRightIcon, CircleArrowRight } from "lucide-react";
import UserSheet from "./UserSheet";

export default function FoodHeroImage() {
  return (
    <div>
      <UserSheet>
      <div className="relative cursor-pointer">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
            <div className="absolute inset-0">
              <Image
                className="object-cover w-full h-full object-center"
                src="/box2.jpg"
                alt="Background"
                quality={100}
                fill
                sizes="100vw" />
              <div className="absolute inset-0 bg-primary-700 mix-blend-multiply" />
            </div>
            <div className="relative px-6 py-10 sm:py-20 lg:px-8 ">
              <h1 className="text-center text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                <span className="block text-gray-100">Package</span>
                <span className="block text-primary-100">Delivery</span>
              </h1>
              <div className="grid place-content-center">

              </div>

            </div>
          </div>
        </div>
      </div>
      </UserSheet>

    </div>
  );
}
