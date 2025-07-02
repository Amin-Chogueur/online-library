import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useAppSelector } from "../hooks/reduxHooks";

export default function Pagination() {
  const totalPages = useAppSelector((state) => state.books.totalPages);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const page = parseInt(searchParams.get("page") || "1");
  const selectedCategory = searchParams.get("category") || "";
  const prevPage = page > 1 ? page - 1 : 1;
  const nextPage = page < totalPages ? page + 1 : totalPages;

  const pagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);

  function navigateToPage(newPage: number) {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(newPage));
    if (selectedCategory) {
      params.set("category", selectedCategory);
    }
    navigate(`${location.pathname}?${params.toString()}`);
  }

  return (
    <div className="flex items-center justify-center gap-1 my-10">
      {/* Previous Button */}
      <button
        disabled={page === 1}
        onClick={() => navigateToPage(prevPage)}
        className="cursor-pointer flex items-center justify-center w-10 h-10 rounded-md  border-gray-500  bg-gray-800  text-gray-200  hover:bg-gray-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <FiChevronLeft className="text-lg" />
      </button>

      {/* Page Numbers */}
      <div className="flex gap-1 mx-2">
        {pagesArray.map((ele) => (
          <button
            onClick={() => navigateToPage(ele)}
            key={ele}
            className={`cursor-pointer w-10 h-10 rounded-md text-sm font-medium transition
              ${
                page === ele
                  ? " text-white bg-amber-600"
                  : "bg-gray-700  text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
          >
            {ele}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        disabled={page === totalPages}
        onClick={() => navigateToPage(nextPage)}
        className="cursor-pointer flex items-center justify-center w-10 h-10 rounded-md  border-gray-500  bg-gray-800  text-gray-200  hover:bg-gray-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <FiChevronRight className="text-lg" />
      </button>
    </div>
  );
}
