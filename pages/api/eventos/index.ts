import { getTime } from "date-fns";
import { NextApiRequest, NextApiResponse } from "next";
import { IEvent } from './../../../src/interfaces/Event';

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const events: IEvent[] = [
    {
      id: 1,
      title: 'Marciano',
      banner: 'banner.jpg',
      date: getTime(new Date()),
      location: 'rua alguma coisa',
      description: 'descricao qualquer'
    },
    {
      id: 2,
      title: 'Selva',
      banner: 'banner2.jpg',
      date: getTime(new Date()),
      location: 'rua alguma coisa',
      description: 'descricao qualquer'
    },
    {
      id: 3,
      title: 'Carae',
      banner: 'banner3.png',
      date: getTime(new Date()),
      location: 'rua alguma coisa',
      description: 'descricao qualquer'
    }
  ]
  return response.status(200).json(events);
}
