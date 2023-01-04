import axios from "axios";
import { useEffect, useState } from "react";
import Banner from "../src/components/Banner";
import BaseHeader from "../src/components/BaseHeader";
import EventCard from "../src/components/EventCard";
import { IEvent } from "../src/interfaces/Event";

export default function Home() {
  const [events, setEvents] = useState<IEvent[]>([]);

  useEffect(() => {
    async function getEvents() {
      const response = await axios.get<IEvent[]>("/api/eventos");
      setEvents(response.data);
    }
    getEvents();
  }, []);

  return (
    <>
      <BaseHeader title="Home" />
      <main>
        {events.length && <Banner events={events} />}
        <div className="grid grid-cols-3 gap-5">
          {events?.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </main>
    </>
  );
}
