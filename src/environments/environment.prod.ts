import {config} from "dotenv";
config();

export const environment = {
  production: true,
  baseUrl: process.env.API_URL
};
