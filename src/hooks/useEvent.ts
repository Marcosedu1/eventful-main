import { useQuery } from "@tanstack/react-query";
import { fetchEvent } from "./../config/fetchEvents";

export const useEvent = (id: number | string) =>
  useQuery(["event", id], () => fetchEvent(id));
