import Image from "next/image"
import React from 'react'
import gif from "/dispatch.gif"

export default function GifSection() {
  return (
    <div>
      <div className="relative w-full h-screen overflow-hidden">
      <Image
        src={gif}
        alt="Background GIF"
        className="object-cover w-full h-full"
        width={1000}
        height={1000}
        style={{
          maxWidth: "100%",
          height: "auto"
        }} />
    </div>
    </div>
  );
}
