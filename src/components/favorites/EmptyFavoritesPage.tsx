import { FaHeart, FaBookOpen, FaShoppingCart } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { Link } from "react-router-dom";

export default function EmptyFavoritesPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-2 md:p-6">
      <div className="max-w-2xl text-center bg-gray-800 rounded-xl p-8 shadow-2xl border border-gray-700">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <MdFavoriteBorder className="text-6xl text-amber-500" />
            <FaHeart className="text-4xl text-amber-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-70" />
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
          Votre collection de favoris est vide
        </h1>

        <p className="text-lg mb-8 text-gray-300 leading-relaxed">
          Parcourez notre collection de livres et cliquez sur le bouton
          <span className="inline-flex mx-2 text-red-500">
            <FaHeart className="mt-1 mr-1" /> en forme de cœur
          </span>
          pour ajouter vos livres préférés ici. Ainsi, lorsque vous souhaiterez
          passer commande, vous n'aurez pas besoin de tout rechercher à nouveau.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to={"/Nos_Livres"}
            className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-600 rounded-lg font-medium hover:from-amber-700 hover:to-amber-700 transition-all cursor-pointer"
          >
            <FaBookOpen className="mr-2" />
            Explorer la collection
          </Link>

          <Link
            to={"/Panier"}
            className="flex items-center justify-center px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-all border border-gray-600 cursor-pointer"
          >
            <FaShoppingCart className="mr-2" />
            Voir le panier
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-700 text-gray-400">
          <p>Revenez ici pour finaliser votre achat en toute simplicité.</p>
        </div>
      </div>
    </div>
  );
}
