import { useEffect, useRef } from "react";
import Pagination from "../components/Pagination";
import { motion, useInView } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { useSearchParams } from "react-router-dom";
import Spinner from "../components/ui/Spinner";
import { fetchKidsBooks } from "../store/slices/kidsBook/kidsBookThunk";
import Product from "../components/product/Product";
import NoProductFound from "../components/ui/NoProductFound";
import Filter from "../components/product/Filter";
import { fetchCategories } from "../store/slices/subCategory/subCategoryThunk";

export default function KidsBooks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // Detects if the section is in view
  const { KidsBooks, kidsBookLoading, error } = useAppSelector(
    (state) => state.kidsBook
  );
  const { loading } = useAppSelector((state) => state.subCategories);
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const selectedSubCategory = searchParams.get("Category") || "All";
  const productStatus = searchParams.get("statut") || undefined;

  useEffect(() => {
    dispatch(fetchCategories("Enfants"));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchKidsBooks({ page, productStatus, selectedSubCategory }));
  }, [dispatch, page, productStatus, selectedSubCategory]);

  return (
    <div ref={ref}>
      <div className="min-h-screen px-2 py-4 sm:px-6">
        <h1 className="text-3xl  mb-12 font-bold text-amber-500 text-center">
          Des lectures magiques pour les enfants
        </h1>
        <div className="mb-10">
          <video
            className=" inset-0 w-full h-[400px] mx-auto"
            src="/kidsVideo.mp4"
            autoPlay
            muted
            loop
            playsInline
            controls
          />
        </div>

        <div className="max-w-7xl mx-auto">
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
              {loading === "pending" ? <Spinner /> : <Filter />}
              {KidsBooks.length === 0 && kidsBookLoading === "succeeded" && (
                <NoProductFound />
              )}

              {kidsBookLoading === "pending" ? (
                <Spinner />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-12">
                  {KidsBooks.map((book, i) => (
                    <motion.div
                      key={book._id}
                      initial={{ opacity: 0, y: 20 }} // Initial state
                      animate={isInView ? { opacity: 1, y: 0 } : {}} // Animate only if section is in view
                      transition={{ duration: 1, delay: i * 0.5 }} // Delay for staggered effect
                    >
                      <Product product={book} category="Enfants" />
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
