import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "nookies";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/token`,
        { email, password }
      );

      if (response.status === 200) {
        setCookie(
          { res },
          "@eventful:access_token",
          response.data.access_token,
          {
            path: "/",
          }
        );
      }

      return res.status(response.status).send(response.data);
    } catch (error: any) {
      return res.status(error?.response?.status ?? 500).send(error?.response?.data ?? "Ocorreu um erro ao fazer o login");
    }
  }

  return res
    .status(400)
    .send({ code: "bad_request", msg: "Ocorreu um erro ao fazer o login" });
}
