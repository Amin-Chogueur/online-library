import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "../queries/events";
import Spinner from "../components/ui/Spinner";
import type { EventType } from "../type/event";
import Event from "../components/event/Event";

export default function Events() {
  const { data: events = [], isLoading } = useQuery<EventType[]>({
    queryKey: ["events"],
    queryFn: fetchEvents,
    staleTime: 1000 * 60 * 10,
  });
  console.log(events.length);
  return (
    <div className="max-w-6xl mx-auto px-2 py-6">
      <h1 className="text-3xl font-bold text-amber-500 mb-6 text-center">
        Événements
      </h1>
      {!isLoading && events.length === 0 && (
        <p className="text-center text-gray-400 mt-10 text-2xl">
          Il n’y a aucun événement pour le moment.
        </p>
      )}
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {events.map((event) => (
            <Event event={event} key={event._id} />
          ))}
        </div>
      )}
    </div>
  );
}
