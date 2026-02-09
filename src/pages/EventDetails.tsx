import { Link, useParams } from "react-router-dom";
import Spinner from "../components/ui/Spinner";
import { FiArrowLeft, FiTag } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import { fetchEvent } from "../queries/events";

export default function EventDetails() {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["event", id],
    queryFn: () => fetchEvent(id!),
    staleTime: 1000 * 60 * 10,
  });

  const event = data?.event;

  if (!event && !isLoading) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400">Événement introuvable.</p>
        <Link
          to={"/Evenement"}
          className="flex gap-2 items-center mb-4 text-amber-500 underline"
        >
          <FiArrowLeft size={24} />
          <span>Retour</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-1 pb-12 text-gray-100">
      {/* Top Navigation */}
      <h1 className="text-3xl font-bold text-amber-500 text-center mb-12">
        Detail du Événements
      </h1>
      <div>
        <div className="flex items-center justify-between mb-8">
          <Link
            to={"/Evenement"}
            className="flex gap-2 items-center mb-4 text-amber-500 underline"
          >
            <FiArrowLeft size={24} />
            <span>Retour</span>
          </Link>
        </div>

        {/* Main Content Card */}
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg overflow-hidden shadow-2xl backdrop-blur-sm">
            {/* Exclusive Media Section */}
            <div className="relative w-full aspect-video bg-black shadow-inner">
              {event.video ? (
                <video
                  src={event.video}
                  controls
                  className="w-full h-full object-contain"
                  poster={event.image} // Uses the image as a thumbnail while video loads
                />
              ) : (
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Content Section */}
            <div className="p-2 md:p-12">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-bold flex items-center gap-1">
                  <FiTag /> ÉVÉNEMENT
                </span>
              </div>

              <h1 className="text-2xl md:text-5xl font-black text-white mb-6 tracking-tight">
                {event.title}
              </h1>

              <div className="prose prose-invert max-w-none">
                <p className="text-lg text-zinc-400 leading-relaxed italic border-l-4 border-amber-500/50 pl-2">
                  {event.description ||
                    "Aucune description détaillée n'a été ajoutée pour cet événement."}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
