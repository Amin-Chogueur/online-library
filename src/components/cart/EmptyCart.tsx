import { FaBoxOpen } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center">
      <FaBoxOpen className="text-6xl text-gray-500 mb-4" />
      <h2 className="text-3xl font-bold text-gray-300 mb-4">
        Votre panier est vide!
      </h2>
      <p className="text-gray-400 max-w-md mx-auto">
        Parcourez notre collection et trouvez des livres qui vous intéressent.
      </p>
      <Link
        to={"/Nos_Livres"}
        className="mt-4 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-600 rounded-lg font-medium hover:from-amber-700 hover:to-amber-700 transition-all cursor-pointer"
      >
        <FaBookOpen className="mr-2" />
        Explorer la collection
      </Link>
    </div>
  );
}
