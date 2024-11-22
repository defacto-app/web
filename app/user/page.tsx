"use client";
import React from 'react'
import EditUserModal from "@/components/user/EditUserModal";
import EditUserNumberModal from "@/components/user/EditUserNumberModal";
import {useAtomAuthContext} from "@/app/store/authAtom";
import Link from "next/link";
import Image from "next/image";
import {AspectRatio} from "@/components/ui/aspect-ratio";

 function Page() {
    const { authUser } = useAtomAuthContext();

    return (
        <div className="container mx-auto">
            <div className=" text-gray-800 p-6 rounded-md  flex items-center">
                <Image
                    className=""
                    src="/user/welcome.png"
                    alt=""
                    width={100}
                    height={100}
                    style={{
                        maxWidth: "100%",
                        height: "auto",
                    }}
                />
                <div>
                    <h1 className="text-xl font-semibold mb-2">
                        Hello {authUser.firstName || authUser.email}.
                    </h1>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center">
                <div className="w-full bg-white rounded-lg p-6 pb-40">
                    <h1 className="text-2xl font-bold mb-6">Account</h1>
                    <div className="space-y-6">
                        {/* User Info Section */}
                        <div className="flex justify-between mb-7 mt-4">
                            <div className="flex flex-col gap-y-2">
                                <div>
                                    <h1 className="mt-2 text-gray-500">Name</h1>
                                    <h2>{authUser.firstName || authUser.email}</h2>
                                </div>
                                <div>
                                    <h1 className="text-gray-500">Email</h1>
                                    <h1>{authUser.email}</h1>
                                </div>
                            </div>
                            <div className="mt-2">
                                <EditUserModal/>
                            </div>
                        </div>
                        <div className="border-b border-gray-500"/>

                        {/* Phone Section */}
                        <div>
                            <div className="flex justify-between mb-4">
                                <div>
                                    <h1 className="mt-2 text-gray-500">Phone</h1>
                                    <h2>{authUser.phoneNumber || "not set"}</h2>
                                </div>
                                <div className="mt-2">
                                    <EditUserNumberModal/>
                                </div>
                            </div>
                            <div className="border-b mb-2 mt-2 border-gray-500"/>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
 }

export default Page