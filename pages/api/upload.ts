import multer from "multer";
import { NextApiRequest, NextApiResponse } from "next";

function runMiddleware(
  req: NextApiRequest & { [key: string]: any },
  res: NextApiResponse,
  fn: (...args: any[]) => void
): Promise<any> {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "POST") {
    try {
      const storage = multer.diskStorage({
        destination: 'public/uploads/',
        filename: function(_, file, callback) {
          callback(null, file.originalname);
        }
      });

      const upload = multer({ storage });

      await runMiddleware(req, res, upload.single("file"));

      return res.status(200).send({ code: 'file-uploaded', msg: "imagem enviada com sucesso"});
    } catch (error: any) {
      return res.status(500).send({ code: 'file-uploaded', msg: "Imagem nao foi enviada"});
    }
  }

  return res
    .status(404)
    .send({ code: "bad_request", msg: "Ocorreu um erro ao processo seu pedido" });
}
