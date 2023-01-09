import { NextApiRequest, NextApiResponse } from "next";

export default function handler(request: NextApiRequest, response: NextApiResponse) {
  if(request.method === "POST") {
    return response.status(200).json({event: request.body})
  }
  return response.status(500)
}