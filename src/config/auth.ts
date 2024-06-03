import { configDotenv } from "dotenv";

configDotenv();

export const auth = {
  secret: String(process.env.secret),
  expires: '1hr'
};
