import React from "react";

export default function page() {
  return (
    <div>
      <div className="grid h-72 grid-cols-10 ">
        {/* image side */}
        <div className="col-span-4 bg-green-800">Image</div>

        {/* review & payment side */}
        <div className="col-span-6  ">
          <div className="  grid ">
            <div className="grid grid-cols-10">
              <h1>Review & Payment</h1>
            <div className=" h-72 col-span-5  bg-primary-600">Sender</div>
            <div className=" h-72  col-span-5 bg-gray-800">Receiver</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
