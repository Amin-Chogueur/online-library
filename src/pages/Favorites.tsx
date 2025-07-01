import { useRef } from "react";
import EmptyFavoritesPage from "../components/favorites/EmptyFavoritesPage";
import { useAppSelector } from "../hooks/reduxHooks";
import { motion, useInView } from "framer-motion";
import Book from "../components/book/Book";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

export default function Favorites() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // Detects if the section is in view
  const favorites = useAppSelector((state) => state.favorites.favorites);

  return (
    <div ref={ref}>
      {favorites.length === 0 ? (
        <EmptyFavoritesPage />
      ) : (
        <div className="relative">
          <Link
            to={"/Nos_Livres"}
            className="flex gap-2 items-center absolute top-[40px] left-0 text-amber-500 underline"
          >
            <FiArrowLeft size={24} />
            <span>Retour à la liste</span>
          </Link>
          <h1 className="text-amber-500 text-3xl  text-center mb-12 font-bold">
            Mes Livres Favoris
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {favorites.map((book, i) => (
              <motion.div
                key={book._id}
                initial={{ opacity: 0, y: 20 }} // Initial state
                animate={isInView ? { opacity: 1, y: 0 } : {}} // Animate only if section is in view
                transition={{ duration: 1, delay: i * 0.5 }} // Delay for staggered effect
              >
                <Book book={book} />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
