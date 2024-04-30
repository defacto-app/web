import env from "@/config/env";
import React from "react";

export default function IsDev({ ...props }) {
  console.log("env.isDev");
  return <div>{env.isDev && <div>show only in dev</div>}</div>;
}
