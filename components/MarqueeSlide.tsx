import Marquee from "@/components/magicui/marquee";
import { cn } from "@/lib/utils";
import React from 'react';
import { Star, Quote } from 'lucide-react';
import Image from 'next/image';

const reviews = [

  {
    name: "Jill",
    username: "@jill",
    role: "Developer",
    testimonial: "I don't know what to say. I'm speechless. This is amazing.",
    img: "/testimony/test1.png",
    rating: 4.5,
  },
  {
    name: "John",
    username: "@john",
    role: "Designer",
    testimonial: "I'm at a loss for words. This is amazing. I love it.",
    img: "/testimony/t2.png",
    rating: 4,
  },
  {
    name: "Jane",
    username: "@jane",
    role: "Product Manager",
    testimonial: "I'm at a loss for words. This is amazing. I love it.",
    img: "/testimony/t3.png",
    rating: 5,
  },
  {
    name: "Jenny",
    username: "@jenny",
    role: "Marketing Specialist",
    testimonial: "I'm at a loss for words. This is amazing. I love it.",
    img: "/testimony/t4.png",
    rating: 4.5,
  },

];

const upperRowContent = [
  {
    text: "Quality meal choices",
    img: "/marquee/ramen.png",
  },
  {
    text: "Live updates on orders",
    img: "/marquee/order.png",
  },
  {
    text: "Fast delivery",
    img: "/marquee/fast-delivery.png",
  },
  {
    text: "Send & Receive Packages",
    img: "/marquee/package.png",
  },
];

const ReviewCard = ({
  img,
  name,
  role,
  testimonial,
  rating,
}: {
  img: string;
  name: string;
  role: string;
  testimonial: string;
  rating: number;
}) => {
  return (
    <div className="pb-10   ">
  <div className="relative border-2  bg-primary-200 flex h-[700px] rounded-lg shadow-lg p-4 w-80 flex-shrink-0">
    <div className="relative h-[670px] w-full mb-4 overflow-hidden rounded-lg">
      <Image
        src={img}
        alt={name}
        layout="fill"
        objectFit="cover"
        className="rounded-xl"
      />
      <div className="absolute inset-0  bg-opacity-50 flex flex-col justify-end p-6">
        <div>
          <h3 className="text-lg font-semibold text-white">{name}</h3>
          <p className="text-sm text-gray-300 mb-2">{role}</p>
          <div className="relative mb-4">
            <Quote className="absolute top-0 left-0 text-gray-100" />
            <p className="italic text-gray-200 pl-6">{testimonial}</p>
            <Quote className="absolute bottom-0 right-0 text-gray-100" />
          </div>
          <div className="flex items-center text-white">
            {[...Array(Math.floor(rating))].map((_, i) => (
              <Star key={i} className="text-yellow-500" />
            ))}
            {rating % 1 !== 0 && <Star className="text-yellow-500" />}
            <span className="ml-2 text-gray-300">{rating}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

const UpperRowCard = ({
  img,
  text,
}: {
  img: string;
  text: string;
}) => {
  return (
    <div className="">
      <div className="flex items-center rounded-xl bg-primary-200 gap-2 p-4">
      <img className="rounded-full" width="32" height="32" alt="" src={img} />
      <p className="text-sm text-primary-900 font-bold">{text}</p>
    </div>
    </div>
  );
};

export default function MarqueeSlide() {
  return (
    <div className="bg-primary-900 relative flex  w-full gap-9 py-5 flex-col items-center justify-center overflow-hidden rounded-lg   ">
     <div className="absolute top-0 right-0 w-1/4 h-1/4">
        <Image src="/bg.png" alt="Background" layout="fill" objectFit="cover" />
      </div>
      <Marquee pauseOnHover className="[--duration:20s] ">
        {upperRowContent.map((item, index) => (
          <UpperRowCard key={index} {...item} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {reviews.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-primary-900 dark:from-background"/>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-primary-900 dark:from-background"/>
    </div>
  );
}
