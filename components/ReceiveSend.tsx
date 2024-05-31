import Image from 'next/image'
import React from 'react'

export default function ReceiveSend() {
  return (
    <div> <div className="relative cursor-pointer mt-10">
    <div className="mx-auto max-w-7xl sm:px-4 lg:px-8">
      <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
        <div className="absolute inset-0">
          <Image
            className="object-cover w-full h-full object-center"
            src="/receive.jpg"
            alt="Background"
            layout="fill"
            quality={100}
          />
          <div className="absolute inset-0 bg-secondary-700 mix-blend-multiply" />
        </div>
        <div className="relative px-6 py-10 sm:py-20 lg:px-8 ">
          <h1 className="text-center text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="block text-gray-100">Receive</span>
            <span className="block text-primary-100">Package</span>
          </h1>
          <div className="grid place-content-center">

          </div>

        </div>
      </div>
    </div>
  </div></div>
  )
}
