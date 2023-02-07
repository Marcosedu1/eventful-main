import { NextApiRequest, NextApiResponse } from "next";
import { api } from "../../../src/config/api-client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      
      console.log(req.body);
      const response = await api.post(
        `/event`,
        req.body
      );
        console.log({response});
        
      return res.status(response.status).send(response.data);
    } catch (error: any) {
      console.log({error});
      
      if (error?.response?.status === 400) {
        return res.status(error?.response?.status).send({
          code: "bad_request",
          msg: "Não foi possivel registrar o evento, verifique os dados informados.",
        });
      }
      return res
        .status(error?.response?.status ?? 500)
        .send(error?.response?.data ?? "erro");
    }
  }

  return res.status(400).send({
    code: "bad_request",
    msg: "Ocorreu um erro ao registrar o evento",
  });
}
