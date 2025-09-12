import { useEffect, useRef } from "react";
import Pagination from "../components/Pagination";
import { motion, useInView } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { useSearchParams } from "react-router-dom";
import Spinner from "../components/ui/Spinner";
import { fetchGamesAndGifts } from "../store/slices/gamesAndGifts/gamesAndGiftsThunk";
import Product from "../components/product/Product";
import NoProductFound from "../components/ui/NoProductFound";
import Filter from "../components/product/Filter";
import { fetchCategories } from "../store/slices/subCategory/subCategoryThunk";

export default function GamesAndGifts() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // Detects if the section is in view
  const { gamesAndGifts, gamesAndGiftsLoading, error } = useAppSelector(
    (state) => state.gamesAndGifts
  );
  console.log(gamesAndGifts);
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const productStatus = searchParams.get("statut") || undefined;
  const selectedSubCategory = searchParams.get("Category") || "All";
  useEffect(() => {
    dispatch(fetchCategories("Jeux et Cadeaux"));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchGamesAndGifts({ page, productStatus, selectedSubCategory }));
  }, [dispatch, page, productStatus, selectedSubCategory]);

  return (
    <div ref={ref}>
      <div className="min-h-screen px-2 py-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl  mb-12 font-bold text-amber-500 text-center">
            Des jeux pour tous – des cadeaux pour chacun
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
              <Filter />
              {gamesAndGifts?.length === 0 &&
                gamesAndGiftsLoading === "succeeded" && <NoProductFound />}

              {gamesAndGiftsLoading === "pending" ? (
                <Spinner />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-12">
                  {gamesAndGifts.map((book, i) => (
                    <motion.div
                      key={book._id}
                      initial={{ opacity: 0, y: 20 }} // Initial state
                      animate={isInView ? { opacity: 1, y: 0 } : {}} // Animate only if section is in view
                      transition={{ duration: 1, delay: i * 0.5 }} // Delay for staggered effect
                    >
                      <Product product={book} category="Jeux-Cadeaux" />
                    </motion.div>
                  ))}
                </div>
              )}
              {gamesAndGifts.length > 0 && (
                <Pagination component="Jeux-Cadeaux" />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
