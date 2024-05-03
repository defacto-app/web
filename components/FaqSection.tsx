import React from "react";
import Image from "next/image";
import FaqAccordian from "./FaqAccordian";

export default function FaqSection() {
  return (
    <div>
   <div className=" block lg:py-32 sm:mb-20">
   <div className="bg-primary-600 container mx-auto flex flex-col lg:flex-row items-center justify-between px-2 lg:px-0">
      <div className="w-full lg:w-1/2 lg:pr-12">
        <Image
          className="w-full h-auto "
          src="/hero/faq12.png"
          alt="FAQ Image"
          width={1824}
          height={1080}
        />
      </div>
      <div className="w-full lg:w-1/2">
        <div className="max-w-md mx-auto">
          <h2 className="container text-4xl lg:text-4xl text-start font-bold text-white py-10">FAQs</h2>
          <FaqAccordian/>
        </div>
      </div>
    </div>
   </div>
  </div>
  );
}
