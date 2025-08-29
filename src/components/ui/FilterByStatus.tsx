import { Link, useLocation, useSearchParams } from "react-router-dom";

export default function FilterByStatus() {
  const { pathname } = useLocation();

  const [searchParams] = useSearchParams();
  const selectedSubCategory = searchParams.get("Category") || "All";
  const productStatus = searchParams.get("statut") || undefined;
  return (
    <div className=" flex justify-center items-center border-t border-t-gray-500 mt-3 pt-3 gap-4">
      <Link
        to={`${pathname}?Category=${selectedSubCategory.replace(/ /g, "_")}&statut=Promotion&page=1`}
        className={`cursor-pointer px-4 py-2 rounded-full border  text-sm transition-all
              hover:bg-amber-200 hover:text-amber-900
              ${
                productStatus === "Promotion"
                  ? " text-white font-medium bg-amber-700 border-amber-800"
                  : "  bg-gray-700 text-gray-200 border-gray-600"
              }`}
      >
        Promotion
      </Link>
      <Link
        to={`${pathname}?Category=${selectedSubCategory.replace(/ /g, "_")}&statut=Nouveau&page=1`}
        className={`cursor-pointer px-4 py-2 rounded-full border  text-sm transition-all
              hover:bg-amber-200 hover:text-amber-900
              ${
                productStatus === "Nouveau"
                  ? " text-white font-medium bg-amber-700 border-amber-800"
                  : " bg-gray-700 text-gray-200 border-gray-600"
              }`}
      >
        Nouveau
      </Link>
    </div>
  );
}
