import React from "react";
import { Button } from "../ui/button";

export default function CtaSection() {
  return (
    <div>
      <div className="">
        <div className="  sm:px-6  lg:-mb-16 sm:py-32 lg:px-8">
          <div className="relative sm:px8 isolate overflow-hidden  bg-primary-600 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
            {/* <svg
              viewBox="0 0 1024 1024"
              className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
              aria-hidden="true"
            >
              <circle
                cx={512}
                cy={512}
                r={512}
                fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
                fillOpacity="0.7"
              />
              <defs>
                <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                  <stop stopColor="#7775D6" />
                  <stop offset={1} stopColor="#E935C1" />
                </radialGradient>
              </defs>
            </svg> */}
            <div className="mx-auto max-w-md lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Download the Defacto App for Free
              </h2>

              <div className="mt-10 lg:flex items-center space-y-4 justify-center gap-x-6 lg:justify-start">
                <a
                  href="#"
                  className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm flex items-center gap-x-2 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <svg
                    width="33"
                    height="33"
                    viewBox="0 0 33 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.7895 2.69568C21.0595 4.18066 20.3845 5.66565 19.5745 6.74564C18.7645 7.82563 17.2795 8.77062 15.7945 8.63562C15.5245 7.15063 16.1995 5.80065 17.0095 4.72066C17.9545 3.64067 19.4395 2.83068 20.7895 2.69568ZM25.1094 26.1854C25.7844 25.1054 26.1894 24.4305 26.7294 23.2155C22.5445 21.5955 21.8695 15.6555 26.0544 13.4956C24.8394 11.8756 23.0845 11.0656 21.3295 11.0656C20.1145 11.0656 19.3045 11.3356 18.4945 11.6056C17.8195 11.8756 17.2795 12.0106 16.6045 12.0106C15.7945 12.0106 15.2545 11.7406 14.4446 11.4706C13.6346 11.2006 12.8246 10.9306 11.8796 10.9306C9.9896 10.9306 7.96462 12.0106 6.74963 14.0356C4.99465 16.7355 5.26465 22.0005 8.09962 26.3204C9.31461 27.9404 10.6646 29.6954 12.4196 29.6954C13.2296 29.6954 13.6346 29.4254 14.1746 29.2904C14.8495 29.0204 15.5245 28.7504 16.6045 28.7504C17.8195 28.7504 18.3595 29.0204 19.0345 29.2904C19.5745 29.5604 19.9795 29.6954 20.7895 29.6954C22.6795 29.6954 24.0295 27.6704 25.1094 26.1854Z"
                      stroke="#272727"
                      stroke-width="1.29599"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>

                  <p className="text-xs">
                    Download in<span className="font-bold" > AppStore </span>
                  </p>
                </a>
                <a
                  href="#"
                  className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm flex items-center gap-x-2 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <svg
                    width="33"
                    height="33"
                    viewBox="0 0 33 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M28.89 17.4104L22.8151 20.5154L18.4951 16.1954L22.8151 11.8755L28.89 14.8455C29.97 15.3855 29.97 17.0054 28.89 17.4104Z"
                      stroke="#272727"
                      stroke-width="1.29599"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M22.815 11.8756L18.495 16.1956L5.53517 29.1554L4.72517 29.5604C3.78018 30.1004 2.7002 29.2904 2.7002 28.2105V4.1807C2.7002 3.10071 3.78018 2.42572 4.72517 2.83071L22.815 11.8756Z"
                      stroke="#272727"
                      stroke-width="1.29599"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M18.495 16.1955L5.53516 29.1553L22.815 20.5154L18.495 16.1955ZM18.495 16.1955L5.53516 3.2356"
                      stroke="#272727"
                      stroke-width="1.29599"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>

                  <p className="text-xs">
                    Download in <span className="font-bold" >PlayStore </span>
                  </p>
                </a>
              </div>
            </div>
            <div className="  grid place-content-center relative ">
              <img
                className=" max-w-xl  bottom-2  rounded-md "
                src="/hero/cta.png"
                alt="App screenshot"
                width={1024}
                height={1080}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="px-6 py-24 sm:px-6 sm:py-32 bg-gray-50 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Become a Rider/Driver at <span className="text-primary-600"> Defacto</span>

          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
          Are you looking for flexible work opportunities with great earning potential? Look no further! Join our team of dedicated riders and become part of an exciting delivery network.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">

            <Button variant="primary" className="w-72 py-3">Become a Member</Button>

          </div>
        </div>
      </div>
    </div>
  );
}
