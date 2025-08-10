import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import Spinner from "../ui/Spinner";
import { useEffect } from "react";
import { fetchBooks } from "../../store/slices/book/bookThunk";
import { fetchCategories } from "../../store/slices/subCategory/subCategoryThunk";
import FilterByStatus from "../ui/FilterByStatus";

export default function Filter() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedSubCategory = searchParams.get("Category") || "All";
  const { subCategories, loading } = useAppSelector(
    (state) => state.subCategories
  );
  const navigateToPage = (selectedSubCategory: string) => {
    if (selectedSubCategory === "") {
      return;
    }
    const subCategory = selectedSubCategory.replace(/ /g, "_");
    navigate(`/Nos_Livres?Category=${subCategory}&page=1`);
  };

  function handleBackToAllBooks() {
    dispatch(fetchBooks({ page: 1, selectedSubCategory: "All" }));
    navigate(`/Nos_Livres?Category=All&page=1`);
  }

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading === "pending") {
    <Spinner />;
    return;
  }

  return (
    <div className="max-w-6xl mx-auto p-3 mb-8  bg-gray-800 rounded-lg shadow-md shadow-gray-900/50">
      {/* Desktop Filter Buttons */}
      <div className="hidden md:flex flex-wrap justify-center gap-3">
        <button
          onClick={handleBackToAllBooks}
          className={`cursor-pointer px-4 py-2 rounded-full border  text-sm transition-all
              hover:bg-gray-700 hover:text-amber-50
              ${
                selectedSubCategory === "All"
                  ? " text-white border-amber-700 font-medium bg-amber-600 "
                  : "   bg-gray-700 text-gray-200 border-gray-600"
              }`}
        >
          Tous
        </button>
        {subCategories.map((subCategory) => (
          <Link
            key={subCategory._id}
            to={`/Nos_Livres?Category=${subCategory.name.replace(/ /g, "_")}&page=1`}
            className={`cursor-pointer px-4 py-2 rounded-full border  text-sm transition-all
              hover:bg-amber-200 hover:text-amber-900
              ${
                selectedSubCategory === subCategory.name.replace(/ /g, "_")
                  ? " text-white font-medium bg-amber-700 border-amber-800"
                  : "bg-amber-100  dark:bg-gray-700 text-gray-200 border-gray-600"
              }`}
          >
            {subCategory.name}
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
                selectedSubCategory === "All"
                  ? " text-white  font-medium bg-amber-700 border-amber-800"
                  : "   bg-gray-700 text-gray-200 border-gray-600"
              }`}
        >
          Tous
        </button>
        <select
          value={selectedSubCategory}
          onChange={(e) => navigateToPage(e.target.value)}
          className="cursor-pointer w-full p-3 rounded-md border border-gray-600 bg-gray-700 text-gray-200  focus:ring-2 focus:ring-amber-600 fborder-amber-500 focus:border-amber-600 outline-none"
        >
          <option value="">-- Sélectionner une catégorie --</option>

          {subCategories.map((subCategory) => (
            <option
              key={subCategory._id}
              value={subCategory.name.replace(/ /g, "_")}
            >
              {subCategory.name}
            </option>
          ))}
        </select>
      </div>
      <FilterByStatus />
    </div>
  );
}
