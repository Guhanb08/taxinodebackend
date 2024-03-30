import dotEnv from "dotenv";

if (process.env.NODE_ENV !== "prod") {
  const configFile = `./.env.${process.env.NODE_ENV}`;
  dotEnv.config({ path: configFile });
} else {
  dotEnv.config();
}
const config = {
  PORT: process.env.PORT,
  DB_URL: process.env.DATABASE_URL,
  APP_SECRET: process.env.APP_SECRET,
  BASE_URL: process.env.BASE_URL,
  JWTKEY: process.env.JWTKEY,
};
export default config;
