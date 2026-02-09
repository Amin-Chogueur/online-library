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
import { fetchStationery } from "../queries/stationery";
import type { ProductType } from "../type/product";

export default function Stationery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // Detects if the section is in view

  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const productStatus = searchParams.get("statut") || undefined;
  const selectedSubCategory = searchParams.get("Category") || "All";

  const { data, isLoading } = useQuery({
    queryKey: ["Papeterie"],
    queryFn: () => fetchCategories("Papeterie"),
    staleTime: 1000 * 60 * 10,
  });
  const {
    data: stationeryData,
    isLoading: stationeryLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["stationery", page, selectedSubCategory, productStatus],
    queryFn: () =>
      fetchStationery({ page, selectedSubCategory, productStatus }),
    staleTime: 1000 * 60 * 10,
  });

  return (
    <div ref={ref}>
      <div className="min-h-screen px-2 py-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl  mb-12 font-bold text-amber-500 text-center">
            Découvrez notre collection de papeterie
          </h1>
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
              {stationeryData?.products.length === 0 && !stationeryLoading && (
                <NoProductFound />
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-12">
                {stationeryData?.products.map(
                  (product: ProductType, i: number) => (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0, y: 20 }} // Initial state
                      animate={isInView ? { opacity: 1, y: 0 } : {}} // Animate only if section is in view
                      transition={{ duration: 1, delay: i * 0.5 }} // Delay for staggered effect
                    >
                      <Product product={product} category="Papeterie" />
                    </motion.div>
                  ),
                )}
              </div>

              {stationeryData?.products.length > 0 && (
                <Pagination totalPages={stationeryData.totalPages} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
