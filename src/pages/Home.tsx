import { useRef } from "react";
import Slider from "../components/slider/Slider";
import { motion, useInView } from "framer-motion";
import HomeCard from "../components/home/HomeCard";

const categories = [
  {
    title: "Romans",
    description:
      "Découvrez une sélection variée de romans, thrillers, et plus.",
    image: "/roman.jpg",
    color: "bg-gradient-to-br from-blue-900 to-blue-700",
    link: "/Nos_Livres",
  },
  {
    title: "Livres pour enfants",
    description: "Des histoires amusantes et éducatives pour les plus jeunes.",
    image: "/enfant.jpg",
    color: "bg-gradient-to-br from-green-900 to-green-700",
    link: "/Enfants",
  },
  {
    title: "Jeux et cadeaux",
    description: "Offrez des moments de joie avec nos jeux et idées cadeaux.",
    image: "/cadeau.jpg",
    color: "bg-gradient-to-br from-purple-900 to-purple-700",
    link: "/Jeux-Cadeaux",
  },
  {
    title: "Papeterie",
    description: "Tout le nécessaire pour bien réussir à l'école.",
    image: "/Papeterie.jpg",
    color: "bg-gradient-to-br from-yellow-900 to-yellow-700",
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
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
