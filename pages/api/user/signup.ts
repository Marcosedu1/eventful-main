import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user`,
        req.body
      );

      return res.status(response.status).send(response.data);
    } catch (error: any) {
      if (error.response.status === 400) {
        return res.status(error?.response?.status).send({
          code: "bad_request",
          msg: "Não foi possivel efetuar o cadastro, verifique os dados informados.",
        });
      }
      return res
        .status(error?.response?.status ?? 500)
        .send(error?.response?.data ?? "erro");
    }
  }

  return res.status(400).send({
    code: "bad_request",
    msg: "Ocorreu um erro ao efetuar o cadastro",
  });
}
