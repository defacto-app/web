import Image from "next/image";
import React from "react";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import PaymentSheet from "./PaymentSheet";

export default function HeroImage() {
  return (
    <div>
      <div>
      <div className="relative" >
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl"  >
            <div className="absolute inset-0">
              <Image
                className="object-cover object-center"
                src="/foodbg.jpg"
                alt="Background"
                layout="fill"
                quality={100}
              />
              <div className="absolute inset-0 bg-primary-500 mix-blend-multiply" />
            </div>
            <div className="relative px-6 py-10 sm:py-20 lg:px-8 ">
              <h1 className="text-center text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                <span className="block text-white">Order From</span>
                <span className="block text-primary-200">Any Restaurant</span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
