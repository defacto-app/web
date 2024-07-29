import env from "@/config/env";
import React from "react";

export default function IsDev({ ...props }) {
  console.log("env.isDev");
  return <div>{env.isDev && <div>show only in dev</div>}</div>;
}


export const tokenConstants = {
  admin: "admin-token",
  user: "user-token",
};

// Type definition for permissible token keys
type TokenOptions = "admin" | "user";

// Retrieves a token from localStorage
export function getToken(key: TokenOptions): string {
  try {
    return localStorage.getItem(tokenConstants[key]) || "";
  } catch (error) {
    console.error("Failed to retrieve token:", error);
    return "";
  }
}

// Stores a token in localStorage
export function setToken(key: TokenOptions, token: string): void {
  try {
    localStorage.setItem(tokenConstants[key], token);
  } catch (error) {
    console.error("Failed to set token:", error);
  }
}

// Clears a token from localStorage
export function clearToken(key: TokenOptions): void {
  try {
    localStorage.removeItem(tokenConstants[key]);
  } catch (error) {
    console.error("Failed to clear token:", error);
  }
}
