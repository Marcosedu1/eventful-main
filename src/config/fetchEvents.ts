import { IEvent } from "../interfaces/Event";
import { api } from "./api-client";

export const fetchEvents = () => {
  return api.get<IEvent[]>("/event");
};
export const fetchEvent = async (id: number) => {
  const {data} = await api.get<IEvent>(`/event/${id}`);
  return data;
};
