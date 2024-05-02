import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

export default function SendReceive() {
  return (
    <div>
      <div>
        <div className="relative  bg-white">
          <div className="mx-auto  max-w-7xl lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            {/* Image Section */}
            <div className="lg:col-span-1 mx-auto max-w-7xl px-6">
              <Image
                className="w-full h-auto"
                src="/image.svg"
                alt="Your Image"
              width={1824}
              height={1080}
              />

            </div>
            {/* Writeup Section */}
            <div className="lg:col-span-1  lg:text-start sm:text-center lg:px-6 px-6 py-10 sm:py-20">
              <h2 className="text-3xl font-bold text-gray-900">
                Send And Receive Packages <br /> Swiftly with <span className="text-primary-600">Defacto</span>
              </h2>
              <p className="mt-4  text-gray-600">
              At Defacto Delivery, we pride ourselves on delivering not just packages, but peace of mind. Our dedicated team ensures that your items reach their destination safely and on time, every time. With our intuitive app, you can track your deliveries in real-time, communicate with your delivery agent, and rest assured that your items are in trusted hands. Say goodbye to delivery worries and hello to hassle-free service with Defacto Delivery. </p>
              <div className="mt-8 flex place-content-center gap-2">
               <Button  variant="primary" className="py-5 w-full px-24">About Us</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
