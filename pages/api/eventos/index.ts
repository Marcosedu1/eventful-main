import { IEvent } from './../../../src/interfaces/Event';
import { NextApiRequest, NextApiResponse } from "next";
import { randomUUID } from "node:crypto";

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const events: IEvent[] = [
    {
      id: randomUUID(),
      title: 'Marciano',
      banner: 'banner.jpg',
      date: new Date(),
      location: 'rua alguma coisa',
      description: 'descricao qualquer'
    },
    {
      id: randomUUID(),
      title: 'Selva',
      banner: 'banner2.jpg',
      date: new Date(),
      location: 'rua alguma coisa',
      description: 'descricao qualquer'
    },
    {
      id: randomUUID(),
      title: 'Carae',
      banner: 'banner3.png',
      date: new Date(),
      location: 'rua alguma coisa',
      description: 'descricao qualquer'
    }
  ]
  return response.status(200).json(events);
}
