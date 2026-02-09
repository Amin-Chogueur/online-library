import { useRef } from "react";
import Slider from "../components/slider/Slider";
import { motion, useInView } from "framer-motion";
import HomeCard from "../components/home/HomeCard";

const categories = [
  {
    title: "Événements",
    description:
      "Découvrez la magie des livres. Rencontres, ateliers et événements pour tous les passionnés.",
    image: "/event.jpeg",
    color: "bg-gradient-to-br from-purple-900 to-indigo-950", // Fixed color
    link: "/Evenement",
  },
  {
    title: "Romans",
    description:
      "Évadez-vous avec notre sélection de thrillers et de récits littéraires incontournables.",
    image: "/roman.jpg",
    color: "bg-gradient-to-br from-blue-900 to-slate-900",
    link: "/Nos_Livres",
  },
  {
    title: "Livres pour enfants",
    description:
      "Éveillez l'imaginaire des plus jeunes avec des aventures magiques et éducatives.",
    image: "/enfant.jpg",
    color: "bg-gradient-to-br from-emerald-900 to-teal-950",
    link: "/Enfants",
  },
  {
    title: "Jeux et cadeaux",
    description:
      "Partagez la joie avec une collection unique de jeux de société et d'idées originales.",
    image: "/cadeau.jpg",
    color: "bg-gradient-to-br from-rose-900 to-zinc-900",
    link: "/Jeux-Cadeaux",
  },
  {
    title: "Papeterie",
    description:
      "Donnez vie à vos idées avec nos articles de qualité pour l'école et le bureau.",
    image: "/Papeterie.jpg",
    color: "bg-gradient-to-br from-amber-700 to-orange-950",
    link: "/Papeterie",
  },
];
export default function Home() {
  const ref = useRef(null);

  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref}>
      <Slider />
      <div className=" h-screen"></div>
      {/* Categories Section */}
      <section className="pt-4 pb-12 px-4 sm:px-6 ">
        <div className="max-w-7xl mx-auto ">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-amber-600 mb-4">
              Nos Produits
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <HomeCard category={category} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
