import axios, { AxiosError } from "axios";
import { parseCookies } from "nookies";
import { InvalidTokenError } from "./errors/invalid-token-errors";

export function setupAPIClient(ctx = undefined) {
  const cookies = parseCookies(ctx);
  console.log(cookies, "texto", parseCookies());
  
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      Authorization: `Bearer ${cookies["@eventful:access_token"]}`,
    },
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError<any, string>) => {
      if (error.response?.status === 401) {
        return Promise.reject(new InvalidTokenError());
      }
    }
  );

  return api;
}
