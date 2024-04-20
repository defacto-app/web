import dotenv from "dotenv";

const envs = dotenv.config({path: ".env"});

const isDev = process.env.NODE_ENV === "development";

const env = {
    BASE_URL: envs.parsed?.BASE_URL || "",
    isDev: isDev,
};


export default env;


