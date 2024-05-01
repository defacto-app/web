import React from "react";

export default function AboutMission() {
  const stats = [
    { label: "Deliveries Completed", value: "100,000" },
    { label: "Cities Served", value: "2" },
    { label: "Satisfied Customers", value: "95%" },
  ];
  return (
    <div>
      <div className="mx-auto pt-20 max-w-7xl px-6 sm:mt-0 lg:px-8 xl:-mt-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
        <h1 className="mt-10 text-4xl font-bold tracking-tight text-black sm:text-6xl">
                  <span className="text-primary-600">Defacto </span>Mission Statement
                </h1>
          <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
            <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
              <p className="text-xl leading-8 text-gray-600">
              At Defacto, our mission is to revolutionize the delivery industry by providing fast, reliable, and efficient services to our clients. We believe in delivering more than just packages; we deliver trust, reliability, and peace of mind.

              </p>
              <div className="mt-10 max-w-xl text-base leading-7 text-gray-700">
              <p>
                  Our commitment to excellence drives us to continuously innovate and improve our delivery processes, ensuring that every delivery is executed with precision and care.
                </p>
                <p className="mt-10">
                  With a focus on customer satisfaction and operational excellence, we aim to exceed expectations and set new standards in the delivery industry. Join us on our mission to redefine delivery services and create a world where packages are delivered safely and on time, every time.
                </p>
              </div>
            </div>
            <div className="lg:flex lg:flex-auto lg:justify-center">
              <dl className="w-64 space-y-8 xl:w-80">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex flex-col-reverse gap-y-4"
                  >
                    <dt className="text-base leading-7 text-gray-600">
                      {stat.label}
                    </dt>
                    <dd className="text-5xl font-semibold tracking-tight text-gray-900">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
