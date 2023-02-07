import { useQuery } from "@tanstack/react-query";
import { fetchEvent } from "./../config/fetchEvents";

export const useEvent = (id: number) =>
  useQuery(["event", id], () => fetchEvent(id));
