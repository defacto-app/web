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
    <div className="relative isolate overflow-hidden  pt-1 sm:pb-20">
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

      <div className="">
        <Image
        width={500}
height={500}
        alt=""
          src={restaurant.background}
          className="absolute inset-0 -z-10  w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-black opacity-50"></div>
      </div>


      <div className=" px-6 lg:px-8">
        <div className=" py-4 sm:py-14 lg:py-14">
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
