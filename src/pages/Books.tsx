import { useEffect, useRef } from "react";
import Pagination from "../components/Pagination";
import Slider from "../components/slider/Slider";
import { motion, useInView } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { useSearchParams } from "react-router-dom";
import Spinner from "../components/ui/Spinner";
import SearchBook from "../components/book/SearchBook";
import NoBooksFound from "../components/book/NoBooksFound";
import Book from "../components/book/Book";
import Filter from "../components/book/Filter";
import { fetchBooks } from "../store/slices/book/bookThunk";

export default function Books() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // Detects if the section is in view
  const { books, bookLoading, error } = useAppSelector((state) => state.books);
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const selectedCategory = searchParams.get("category") || "All";

  useEffect(() => {
    dispatch(fetchBooks({ page, selectedCategory }));
  }, [dispatch, page, selectedCategory]);

  return (
    <div ref={ref}>
      <Slider />
      <div className=" h-[80vh]"></div>
      <div className="min-h-screen px-2 py-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl  mt-[60px] mb-8 font-bold text-amber-500 text-center">
            Notre collection
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
              {" "}
              {bookLoading === "succeeded" && (
                <>
                  <Filter />
                  <SearchBook />
                </>
              )}
              {books.length === 0 && bookLoading === "succeeded" && (
                <NoBooksFound />
              )}
              {bookLoading === "pending" ? (
                <Spinner />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {books.map((book, i) => (
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
              )}
              {books.length > 0 && <Pagination />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
