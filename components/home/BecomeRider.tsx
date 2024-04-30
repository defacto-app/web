import React from 'react'
import Link from "next/link"
import { Button } from '../ui/button'
import Image from 'next/image';

export default function BecomeRider() {
  const href = "/rider";
  return (
    <div>

<div className="relative bg-white py-4">
      <div className="absolute inset-x-0 top-0 hidden h-1/2  lg:block" aria-hidden="true" />
      <div className="mx-auto max-w-7xl  lg:bg-transparent lg:px-8">
        <div className="lg:grid lg:grid-cols-12">
          <div className="relative z-10 lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:bg-transparent lg:py-16">
            <div className="absolute inset-x-0 h-1/2  lg:hidden" aria-hidden="true" />
            <div className="mx-auto max-w-md px-6 sm:max-w-3xl lg:max-w-none lg:p-0">
              <div className="aspect-h-6 aspect-w-10 sm:aspect-h-1 sm:aspect-w-2 lg:aspect-w-1">
                <Image
                  className=" object-cover "
                  src="/hero/delivery3.svg"
                  alt=""
                  width={1000}
                  height={1000}
                />
              </div>
            </div>
          </div>

          <div className="relative  lg:col-span-10 lg:col-start-3 lg:row-start-1 lg:grid lg:grid-cols-10 lg:items-center lg:rounded-3xl">
            {/* <div className="absolute inset-0 hidden overflow-hidden rounded-3xl lg:block" aria-hidden="true">
              <svg
                className="absolute bottom-full left-full -translate-x-2/3 translate-y-1/3 transform xl:bottom-auto xl:top-0 xl:translate-y-0"
                width={404}
                height={384}
                fill="none"
                viewBox="0 0 404 384"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect x={0} y={0} width={4} height={4} className="text-indigo-500" fill="currentColor" />
                  </pattern>
                </defs>
                <rect width={404} height={384} fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)" />
              </svg>
              <svg
                className="absolute top-full -translate-x-1/3 -translate-y-1/3 transform xl:-translate-y-1/2"
                width={404}
                height={384}
                fill="none"
                viewBox="0 0 404 384"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect x={0} y={0} width={4} height={4} className="text-indigo-500" fill="currentColor" />
                  </pattern>
                </defs>
                <rect width={404} height={384} fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)" />
              </svg>
            </div> */}
            <div className="relative mx-auto max-w-md space-y-6 px-6 py-12 sm:max-w-3xl sm:py-16 lg:col-span-6 lg:col-start-4 lg:max-w-none lg:p-0">
              <h2 className="text-4xl sm:text-6xl font-bold tracking-tight " id="join-heading">
              Become a Rider/Driver at <span className='text-primary-600'>Defacto</span>
              </h2>
              <p>
              Are you looking for a flexible way to earn extra income while enjoying the freedom of the open road? Look no further! Become a rider with Defacto Delivery and embark on a rewarding journey. As a valued member of our team, you'll have the opportunity to set your own schedule, explore your city, and make a difference in your community. Join us in delivering smiles, one order at a time.
              </p>

              <div className='py-1'>
              <Link href={href}>
                    <Button variant="primary2">
                      Become Rider
                    </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    </div>
  )
}
