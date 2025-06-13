import { useEffect } from "react";
import Pagination from "../components/Pagination";
import Slider from "../components/slider/Slider";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { fetchBooks } from "../store/slices/bookSlices";
import { useSearchParams } from "react-router-dom";
import Spinner from "../components/ui/Spinner";
import SearchBook from "../components/book/SearchBook";
import NoBooksFound from "../components/book/NoBooksFound";
import Book from "../components/book/Book";
import Filter from "../components/book/Filter";

export default function Books() {
  const { books, bookLoading } = useAppSelector((state) => state.books);
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const selectedCategory = searchParams.get("category") || "All";

  useEffect(() => {
    dispatch(fetchBooks({ page, selectedCategory }));
  }, [dispatch, page, selectedCategory]);

  return (
    <div>
      Books
      <Slider />
      <div className=" h-[80vh]"></div>
      <div className="min-h-screen px-2 py-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl mb-8 font-bold text-amber-600 text-center">
            Notre collection
          </h1>

          <Filter />
          <SearchBook />

          {books.length === 0 && bookLoading === "succeeded" && (
            <NoBooksFound />
          )}
          {bookLoading === "pending" ? (
            <Spinner />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {books.map((book) => (
                <Book key={book._id} book={book} />
              ))}
            </div>
          )}
        </div>
        <Pagination />
      </div>
    </div>
  );
}
