import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "nookies";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    console.log(req.body);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/token`,
        { email, password }
      );

      console.log({ response });

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

      console.log(response.status);

      return res.status(response.status).send(response.data);
    } catch (error: any) {
      return res.status(error?.response?.status).send(error?.response?.data);
    }
  }

  return res
    .status(404)
    .send({ code: "bad_request", msg: "Ocorreu um erro ao fazer o login" });
}
