

const isDev = process.env.NODE_ENV === "development";

const env = {
    BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || "",
    isDev: isDev,
};

export default env;
