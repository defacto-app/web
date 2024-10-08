import React from "react";
import Image from "next/image";

export default function HeroSection () {
  const logos = [
    {
      src: "https://tailwindui.com/img/logos/tuple-logo-gray-400.svg",
      alt: "Tuple",
    },
    {
      src: "https://tailwindui.com/img/logos/mirage-logo-gray-400.svg",
      alt: "Mirage",
    },
    {
      src: "https://tailwindui.com/img/logos/statickit-logo-gray-400.svg",
      alt: "StaticKit",
    },
    {
      src: "https://tailwindui.com/img/logos/transistor-logo-gray-400.svg",
      alt: "Transistor",
    },
    {
      src: "https://tailwindui.com/img/logos/workcation-logo-gray-400.svg",
      alt: "Workcation",
    },
  ];

  const logoElements = logos.map((logo, index) => (
    <div
      className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1"
      // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
      key={index}
    >
      <Image
        className="h-12"
        src={logo.src}
        alt={logo.alt}
        width={100}
        height={100}
        style={{
          width: "100%",
          maxWidth: "100%",
          height: "auto"
        }} />
    </div>
  ));
  return (
    <div>
      <div className="relative isolate -z-10">
        <svg
          className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M.5 200V.5H200" fill="none" />
            </pattern>
          </defs>
          {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
            <path
              d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect
            width="100%"
            height="100%"
            strokeWidth={0}
            fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
          />
        </svg>
        <div
          className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
          aria-hidden="true"
        >
          <div
            className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
            style={{
              clipPath:
                "polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)",
            }}
          />
        </div>
        <div className="overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 pb-22 pt-16 sm:pt-20 lg:px-8 lg:pt-22">
            <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
              <div className="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                <h1 className="mt-10 text-4xl font-bold tracking-tight text-black sm:text-6xl">
                  <span className="text-primary-600">Defacto: </span> Your
                  Partner in Fast and Reliable Deliveries
                </h1>

                <p className="relative mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
                  At Defacto, we understand the importance of timely and
                  dependable deliveries in today's fast-paced world. Whether
                  you're a business seeking efficient logistics solutions or an
                  individual expecting a package, we are here to simplify your
                  delivery experience.
                </p>
              </div>
              <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                  <div className="relative">
                    <Image
                      src="/hero/deliver.png"
                      alt=""
                      className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      width={1000}
                      height={1000}
                      style={{
                        width: "100%",
                        height: "auto",
                        maxWidth: "100%",
                      }} />
                    <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
                </div>
                <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                  <div className="relative">
                    <Image
                      src="/hero/delivery.png"
                      alt=""
                      className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      width={1000}
                      height={1000}
                      style={{
                        width: "100%",
                        height: "auto",
                        maxWidth: "100%",
                      }} />
                    <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
                  <div className="relative">
                    <Image
                      src="/hero/deliver2.png"
                      alt=""
                      className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      width={1000}
                      height={1000}
                      style={{
                        width: "100%",
                        height: "auto",
                        maxWidth: "100%",
                      }} />
                    <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className=" mb-10 py-6 ">
            <p className="text-start text-base font-semibold text-gray-500">
              Trusted by over 30+ businesses
            </p>
            <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
              {logoElements}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
