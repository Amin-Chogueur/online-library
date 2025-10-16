import { useRef } from "react";
import Pagination from "../components/Pagination";
import { motion, useInView } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import Spinner from "../components/ui/Spinner";
import Product from "../components/product/Product";
import NoProductFound from "../components/ui/NoProductFound";
import Filter from "../components/product/Filter";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../queries/subCategories";
import { fetchKidsBooks } from "../queries/kids";
import type { ProductType } from "../type/product";

export default function KidsBooks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // Detects if the section is in view
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const selectedSubCategory = searchParams.get("Category") || "All";
  const productStatus = searchParams.get("statut") || undefined;

  const { data, isLoading } = useQuery({
    queryKey: ["Enfants"],
    queryFn: () => fetchCategories("Enfants"),
    staleTime: 1000 * 60 * 10,
  });
  const {
    data: kidsBooksData,
    isLoading: kidsBookLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["kids", page, selectedSubCategory, productStatus],
    queryFn: () => fetchKidsBooks({ page, selectedSubCategory, productStatus }),
    staleTime: 1000 * 60 * 10,
  });

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
          {isError ? (
            <div className="text-red-500 text-center space-y-4">
              <p className="text-2xl">{error.message}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition cursor-pointer"
              >
                Réessayer
              </button>
            </div>
          ) : (
            <div>
              {isLoading ? (
                <Spinner />
              ) : (
                <Filter subCategories={data.subCategories} />
              )}
              {kidsBooksData?.products.length === 0 && !kidsBookLoading && (
                <NoProductFound />
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-12">
                {kidsBooksData?.products.map((book: ProductType, i: number) => (
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

              {kidsBooksData?.products.length > 0 && (
                <Pagination totalPages={kidsBooksData.totalPages} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
