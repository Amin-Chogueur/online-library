import { useEffect, useRef } from "react";
import Pagination from "../components/Pagination";
import { motion, useInView } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { useSearchParams } from "react-router-dom";
import Spinner from "../components/ui/Spinner";
import { fetchKidsBooks } from "../store/slices/kidsBook/kidsBookThunk";
import Product from "../components/product/Product";
import NoProductFound from "../components/product/NoProductFound";

export default function KidsBooks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // Detects if the section is in view
  const { KidsBooks, kidsBookLoading, error } = useAppSelector(
    (state) => state.kidsBook
  );
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");

  useEffect(() => {
    dispatch(fetchKidsBooks({ page }));
  }, [dispatch, page]);

  return (
    <div ref={ref}>
      <div className="min-h-screen px-2 py-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl  mb-12 font-bold text-amber-500 text-center">
            Des lectures magiques pour les enfants
          </h1>
          {error ? (
            <div className="text-red-500 text-center space-y-4">
              <p className="text-2xl">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition cursor-pointer"
              >
                Réessayer
              </button>
            </div>
          ) : (
            <div>
              {KidsBooks.length === 0 && kidsBookLoading === "succeeded" && (
                <NoProductFound />
              )}
              {kidsBookLoading === "pending" ? (
                <Spinner />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {KidsBooks.map((book, i) => (
                    <motion.div
                      key={book._id}
                      initial={{ opacity: 0, y: 20 }} // Initial state
                      animate={isInView ? { opacity: 1, y: 0 } : {}} // Animate only if section is in view
                      transition={{ duration: 1, delay: i * 0.5 }} // Delay for staggered effect
                    >
                      <Product product={book} category="Enfance" />
                    </motion.div>
                  ))}
                </div>
              )}
              {KidsBooks.length > 0 && <Pagination component="Enfance" />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
