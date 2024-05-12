"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function RiderPage() {
  const [driverLicense, setDriverLicense] = useState<string | null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setDriverLicense(URL.createObjectURL(file));
    }
  };
  return (
    <div>
      <div className="relative bg-white">
        <div className="lg:absolute lg:inset-0 sm:h-full lg:left-1/2">
          <Image
            className="h-auto sm:h-auto lg:h-full w-full bg-gray-50 object-cover lg:absolute"
            src="/rider/deliveryguy.png"
            alt=""
            width={1000}
            height={2000}
          />
        </div>
        <div className="py-6 sm:pb-32 sm:pt-24 lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-2 lg:pt-32">
          <div className="px-6 lg:px-8">
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight py-8 text-primary-600">
              Register as a Rider/Driver
            </h2>
            <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
              <Card className="mx-auto  rounded-xl">
                <CardContent>
                  <div className="grid gap-4 ">
                    <div className="grid gap-2 py-2">
                      <Label htmlFor="email">Full Name</Label>
                      <Input
                        id="name"
                        name="full-name"
                        type="name"
                        placeholder="e.g Olusegun Obasanjo"
                        required
                      />
                    </div>{" "}
                    <div className="grid gap-2 py-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                      />
                    </div>
                    <div className="grid gap-2 py-2">
                      <Label htmlFor="email">Phone Number</Label>
                      <Input
                        id="number"
                        name="number"
                        type="number"
                        placeholder="090*******"
                        required
                      />
                    </div>
                    <div className="grid gap-2 py-2">
                      <Label htmlFor="vehicle-type">Vehicle Type</Label>
                      <Input
                        id="vehicle-type"
                        name="vehicle-type"
                        type="text"
                        placeholder="Car, Motorcycle, Bicycle, etc."
                      />
                    </div>
                    <div className="grid gap-2 py-2">
                      <Label htmlFor="experience">
                        Driving Experience (Years)
                      </Label>
                      <Input
                        id="experience"
                        name="experience"
                        type="number"
                        placeholder="2"
                      />
                    </div>
                    <div className="grid gap-2 py-2">
                      <Label htmlFor="driver-license">Driver's License</Label>
                      {driverLicense ? (
                        <Image
                          src={driverLicense}
                          alt="Driver's License"
                          className="h-32 w-auto"
                        />
                      ) : (
                        <Input
                          id="driver-license"
                          name="driver-license"
                          type="file"
                          onChange={handleFileChange}
                          accept="image/*"
                          required
                        />
                      )}
                    </div>
                  </div>
                  <div className="pt-10">
                    <Button variant="primary" type="submit" className="w-full">
                      Submit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
