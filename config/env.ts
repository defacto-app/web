import dotenv from "dotenv";

const envs = dotenv.config({ path: ".env" });

const isDev = process.env.NODE_ENV === "development";

const env = {
   BASE_URL: envs.parsed?.BASE_URL || "",
   isDev: isDev,
};

export const supabaseServiceRole = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE || "";


console.log(env,"env--+++");
export default env;


