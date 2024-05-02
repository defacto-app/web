import React from "react";
import Questions from "./Questions";
import Image from "next/image";
import FaqAccordian from "./FaqAccordian";

export default function FaqSection() {
  return (
    <div className="bg-white">
   <div className=" block p-24 lg:py-32">
   <div className="bg-primary-600 rounded-xl container mx-auto flex flex-col lg:flex-row items-center justify-between px-6 lg:px-0">
      {/* Image */}
      <div className="w-full lg:w-1/2 lg:pr-12">
        <Image
          className="w-full h-auto "
          src="/hero/faq12.png"
          alt="FAQ Image"
          width={1824}
          height={1080}
        />
      </div>
      {/* Content */}
      <div className="w-full lg:w-1/2">
        <div className="max-w-md mx-auto">
          <h2 className="text-4xl lg:text-4xl text-center font-bold text-white py-10">FAQs</h2>
          <FaqAccordian/>
        </div>
      </div>
    </div>
   </div>
  </div>
  );
}
