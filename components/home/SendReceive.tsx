import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

export default function SendReceive() {
  return (
    <div>
      <div>
        <div className="relative  bg-white">
          <div className="mx-auto lg:grid lg:grid-cols-2 lg:gap-x-8 ">
            <div className="lg:col-span-1 mx-auto">
              <Image
                className=" object-cover w-full sm:px-4 h-auto sm:max-w-md"
                src="/send.png"
                alt="Your Image"
              width={1824}
              height={1080}
              />

            </div>
            <div className="lg:col-span-1  lg:text-start sm:text-start lg:px-6 px-6 py-10 sm:py-20">
              <h2 className="text-4xl sm:text-6xl font-bold text-primary-600">
                Send And Receive Packages Swiftly<br />  with Defacto Delivery
              </h2>
              <p className="mt-4  text-gray-600">
              At Defacto Delivery, we pride ourselves on delivering not just packages, but peace of mind. Our dedicated team ensures that your items reach their destination safely and on time, every time. With our intuitive app, you can track your deliveries in real-time, communicate with your delivery agent, and rest assured that your items are in trusted hands. Say goodbye to delivery worries and hello to hassle-free service with Defacto Delivery. </p>
              <div className="mt-8 flex place-content-start gap-2">
               <Button  variant="primary" className="py-5 w px-10">About Us</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
