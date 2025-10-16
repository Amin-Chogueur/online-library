import { useRef, useState } from "react";
import Pagination from "../components/Pagination";
import { motion, useInView } from "framer-motion";

import Spinner from "../components/ui/Spinner";
import SearchBook from "../components/product/SearchProduct";

import Filter from "../components/product/Filter";
import Product from "../components/product/Product";
import NoProductFound from "../components/ui/NoProductFound";
import { useSearchParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../queries/subCategories";
import { fetchBooks } from "../queries/books";
import type { ProductType } from "../type/product";

export default function Books() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // Detects if the section is in view
  const [title, setTitle] = useState("");
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");

  const selectedSubCategory = searchParams.get("Category") || "All";
  const productStatus = searchParams.get("statut") || undefined;

  const { data, isLoading, error } = useQuery({
    queryKey: ["Romans"],
    queryFn: () => fetchCategories("Romans"),
    staleTime: 1000 * 60 * 10,
  });

  const { data: booksData, isLoading: bookLoading } = useQuery({
    queryKey: ["Books", page, selectedSubCategory, productStatus, title],
    queryFn: () =>
      fetchBooks({ page, selectedSubCategory, productStatus, title }),
    staleTime: 1000 * 60 * 10,
  });

  return (
    <div ref={ref}>
      <div className="min-h-screen px-2 py-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl  mb-12 font-bold text-amber-500 text-center">
            Découvrez notre collection de livres et romans
          </h1>
          {error ? (
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

              <SearchBook setTitle={setTitle} />

              {booksData?.products.length === 0 && !bookLoading && (
                <NoProductFound />
              )}

              <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {booksData?.products.map((book: ProductType, i: number) => (
                  <motion.div
                    key={book._id}
                    initial={{ opacity: 0, y: 20 }} // Initial state
                    animate={isInView ? { opacity: 1, y: 0 } : {}} // Animate only if section is in view
                    transition={{ duration: 1, delay: i * 0.5 }} // Delay for staggered effect
                  >
                    <Product product={book} category="Nos_Livres" />
                  </motion.div>
                ))}
              </div>

              {booksData?.products.length > 0 && (
                <Pagination totalPages={booksData.totalPages} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
