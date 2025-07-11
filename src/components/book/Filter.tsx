import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import Spinner from "../ui/Spinner";
import { useEffect } from "react";
import { fetchBooks } from "../../store/slices/book/bookThunk";
import { fetchCategories } from "../../store/slices/category/categoryThunk";

export default function Filter() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "All";

  const { categories, loading } = useAppSelector((state) => state.categories);

  const navigateToPage = (selectedCategory: string) => {
    if (selectedCategory === "") {
      return;
    }
    const categoory = selectedCategory.replace(/ /g, "_");
    navigate(`/Nos_Livres?category=${categoory}&page=1`);
  };

  function handleBackToAllBooks() {
    dispatch(fetchBooks({ page: 1, selectedCategory: "All" }));
    navigate(`/Nos_Livres?category=All&page=1`);
  }

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading === "pending") {
    <Spinner />;
    return;
  }

  return (
    <div className="max-w-6xl mx-auto p-5 mb-8  bg-gray-800 rounded-lg shadow-md shadow-gray-900/50">
      <h3 className="text-2xl  font-semibold text-amber-100 mb-4 pb-2 text-center border-b border-gray-600">
        Filtrer par catégorie
      </h3>

      {/* Desktop Filter Buttons */}
      <div className="hidden md:flex flex-wrap justify-center gap-3">
        <button
          onClick={handleBackToAllBooks}
          className={`cursor-pointer px-4 py-2 rounded-full border  text-sm transition-all
              hover:bg-gray-700 hover:text-amber-50
              ${
                selectedCategory === "All"
                  ? " text-white border-amber-700 font-medium bg-amber-600 "
                  : "   bg-gray-700 text-gray-200 border-gray-600"
              }`}
        >
          Tous
        </button>
        {categories.map((category) => (
          <Link
            key={category._id}
            to={`/Nos_Livres?category=${category.name.replace(/ /g, "_")}&page=1`}
            className={`cursor-pointer px-4 py-2 rounded-full border  text-sm transition-all
              hover:bg-amber-200 hover:text-amber-900
              ${
                selectedCategory === category.name.replace(/ /g, "_")
                  ? " text-white font-medium bg-amber-700 border-amber-800"
                  : "bg-amber-100  dark:bg-gray-700 text-gray-200 border-gray-600"
              }`}
          >
            {category.name}
          </Link>
        ))}
      </div>

      {/* Mobile Dropdown */}
      <div className="md:hidden mt-4 w-full flex flex-col gap-2">
        <button
          onClick={handleBackToAllBooks}
          className={`cursor-pointer px-4 py-2 rounded-lg border  text-sm transition-all
              hover:bg-gray-700 hover:text-amber-50
              ${
                selectedCategory === "All"
                  ? " text-white  font-medium bg-amber-700 border-amber-800"
                  : "   bg-gray-700 text-gray-200 border-gray-600"
              }`}
        >
          Tous
        </button>
        <select
          value={selectedCategory}
          onChange={(e) => navigateToPage(e.target.value)}
          className="cursor-pointer w-full p-3 rounded-md border border-gray-600 bg-gray-700 text-gray-200  focus:ring-2 focus:ring-amber-600 fborder-amber-500 focus:border-amber-600 outline-none"
        >
          <option value="">-- Sélectionner une catégorie --</option>

          {categories.map((category) => (
            <option key={category._id} value={category.name.replace(/ /g, "_")}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
