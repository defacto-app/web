import React from "react";
import { Button } from "../ui/button";

export default function SendReceive() {
  return (
    <div>
      <div>
        <div className="relative  bg-white">
          <div className="mx-auto container max-w-7xl lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            {/* Image Section */}
            <div className="lg:col-span-1 mx-auto max-w-7xl px-6">
              <img
                className="w-full h-auto"
                src="/hero/delivery2.jpg"
                alt="Your Image"
              />
            </div>
            {/* Writeup Section */}
            <div className="lg:col-span-1 lg:px-6 px-6 py-10 sm:py-20">
              <h2 className="text-3xl font-bold text-gray-900">
                Send And Receive Packages <br /> Swiftly with <span className="text-primary-600">Defacto</span>
              </h2>
              <p className="mt-4  text-gray-600">
              At Defacto Delivery, we pride ourselves on delivering not just packages, but peace of mind. Our dedicated team ensures that your items reach their destination safely and on time, every time.
              </p>
              <div className="mt-8">
               <Button variant="primary">About Us</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
