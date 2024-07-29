// components/RestaurantHeader.tsx
import React from "react";
import { BikeIcon, Clock2Icon, HomeIcon, MapPin, Star } from "lucide-react";
import { Restaurant } from "@/lib/types";
import Link from "next/link";
import { InstagramLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import Image from "next/image";

interface RestaurantHeaderProps {
  restaurant: Restaurant;
}

const RestaurantHeader: React.FC<RestaurantHeaderProps> = ({ restaurant }) => {
  return (
    // new area
    <div className="relative isolate overflow-hidden  pb-16 pt-14 sm:pb-20">
      <div className="absolute inset-0 -z-10 bg-black opacity-50"></div>

      <div className="flex relative justify-between p-10">
        <Link href={"/"} className="bg-primary-600 rounded-full p-3">
          <HomeIcon className="text-white" />
        </Link>
        <div className="flex gap-2">
          <div className="">
            <div> </div>
            <Image
              src="/rest/social/instagram.png"
              alt="IG"
              width={30}
              height={30}
            />
          </div>
          <div>
            {" "}
            <Image
              src="/rest/social/twitter.png"
              alt="IG"
              width={30}
              height={30}
            />{" "}
          </div>
          <div>
            {" "}
            <Image
              src="/rest/social/whatsapp.png"
              alt="IG"
              width={30}
              height={30}
            />{" "}
          </div>
        </div>
      </div>

      <div>
        <Image
            width={300}
            height={300}
          alt=""
          src={restaurant.background}
          className="absolute inset-0 -z-10 h-[700px] w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-black opacity-50"></div>
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>
      <div className=" px-6 lg:px-8">
        <div className=" py-10 sm:py-20 lg:py-24">
          <div className="text-start">
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
              {restaurant.name}
            </h1>
            <div className="flex gap-3 items-center  text-xl">
              <div className="flex gap-3 mt-4 ">
                <MapPin className="text-white  text-2xl" />
                <p className="text-white font-semibold">
                  {restaurant.distance}
                </p>
              </div>
              <div className="flex gap-3 items-center mt-2  text-xl">
                <div className="bg-primary-500 p-2 rounded-full">
                  <BikeIcon className="text-white" />
                </div>
                <p className="mt-3 text-white font-semibold">
                  {restaurant.fee}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-3 text-xl">
              <Clock2Icon className="text-white " />
              <p className=" text-xl  text-white">
                <span className="text-primary-500 font-bold">Open By</span>{" "}
                {restaurant.hours}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantHeader;
