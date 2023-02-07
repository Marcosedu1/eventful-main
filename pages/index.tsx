import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import Banner from "../src/components/Banner";
import BaseHeader from "../src/components/BaseHeader";
import EventCard from "../src/components/EventCard";
import { api } from "../src/config/api-client";
import { fetchEvents } from "../src/config/fetchEvents";
import { useApp } from "../src/context/AppContext";
import useRequest from "../src/hooks/useRequest";
import { IEvent } from "../src/interfaces/Event";

export default function Home() {
  const { checkUser } = useApp();

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  // const { data } = useRequest<IEvent[]>({
  //   url: "/event",
  //   method: "GET",
  // });

  const { data, fetchStatus, status } = useQuery({
    queryKey: ["events"],
    queryFn: () => queryEvents(),
  });

  const queryEvents = () => {
    return fetchEvents().then((response) => response.data);
  };

  return (
    <>
      <BaseHeader title="Home" />
      <main>
        {status === "success" && fetchStatus === "idle" ? (
          <>
            {data?.length > 0 && <Banner events={data} />}
            <div className="grid grid-cols-3 gap-5">
              {data?.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </>
        ) : null}
      </main>
    </>
  );
}
