import { useEffect } from "react";
import Banner from "../src/components/Banner";
import BaseHeader from "../src/components/BaseHeader";
import EventCard from "../src/components/EventCard";
import { useApp } from "../src/context/AppContext";
import useRequest from "../src/hooks/useRequest";
import { IEvent } from "../src/interfaces/Event";

export default function Home() {
  const { checkUser } = useApp();

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  const { data, error, isValidating } = useRequest<IEvent[]>({
    url: "/event",
    method: "GET",
  });

  return (
    <>
      <BaseHeader title="Home" />
      <main>
        {data && data?.length > 0 && <Banner events={data} />}
        <div className="grid grid-cols-3 gap-5">
          {data?.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </main>
    </>
  );
}
