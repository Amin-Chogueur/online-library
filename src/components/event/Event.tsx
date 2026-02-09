import { Link } from "react-router-dom";
import type { EventType } from "../../type/event";

export default function Event({ event }: { event: EventType }) {
  return (
    <Link
      to={`/Evenement/${event._id}`}
      className="group relative block w-full bg-zinc-900 rounded-lg overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_rgba(245,158,11,0.15)] hover:-translate-y-2"
    >
      {/* Image Container with Aspect Ratio */}
      <div className="relative aspect-[3/4] sm:aspect-square md:aspect-[4/5] overflow-hidden">
        {/* Decorative Gradient Overlay (always visible to protect text) */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent z-10" />

        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Action Badge (appears on hover) */}
        <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <span className="bg-amber-500 text-black px-4 py-1.5 rounded-full text-xs font-bold shadow-xl">
            Découvrir
          </span>
        </div>
      </div>

      {/* Content Area - Floating over the bottom of the image */}
      <div className="absolute bottom-0 left-0 right-0 p-2 z-20">
        <div className="space-y-2">
          {/* Subtle Category/Tag */}
          <span className="inline-block px-2 py-0.5 rounded bg-amber-500/20 text-amber-500 text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm">
            Événement
          </span>

          <h3 className="text-xl font-bold text-white leading-tight group-hover:text-amber-400 transition-colors">
            {event.title}
          </h3>

          {/* Progress-style line that expands on hover */}
          <div className="relative h-1 w-12 bg-amber-500/30 rounded-full overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-0 bg-amber-500 transition-all duration-500 group-hover:w-full" />
          </div>
        </div>
      </div>
    </Link>
  );
}
