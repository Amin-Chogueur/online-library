import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { addToCart } from "../../store/slices/cart/cartSlice";
import type { ProductType } from "../../type/product";
import {
  addTofavoritePage,
  removeFromfavoritePage,
} from "../../store/slices/favorites/favoriteSlice";
import { formatCurency } from "../../helpers/formatCurency";
export default function ProductDetails({ product }: { product: ProductType }) {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.cart);
  const favorites = useAppSelector((state) => state.favorites.favorites);
  const isInFavorites = favorites.find((item) => item._id === product?._id);
  const isInCart = cart.find((item) => item._id === product?._id);
  function handleAdToCart(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault(); // prevents the <Link> default action
    e.stopPropagation();
    dispatch(addToCart(product?._id));
  }

  return (
    <div className=" max-w-5xl mx-auto  text-gray-100 mb-[20px]">
      <div className="relative flex flex-col md:flex-row gap-8 bg-gray-800 p-3 rounded-xl shadow-lg">
        {/* Image du livre */}
        <div className="w-full md:w-1/3">
          <img
            src={product.image}
            alt={product.title}
            width={400}
            height={600}
            className="rounded-lg w-full h-auto object-cover shadow-md"
          />
        </div>

        {/* Informations du livre */}
        <div className="flex-1">
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold text-amber-500 mb-2">
              {product.title}
            </h1>
            {isInFavorites ? (
              <button
                onClick={() => dispatch(removeFromfavoritePage(product._id))}
                className="text-2xl focus:outline-none cursor-pointer"
              >
                <FaHeart className="text-red-500" />
              </button>
            ) : (
              <button
                onClick={() => dispatch(addTofavoritePage(product))}
                className="text-2xl focus:outline-none cursor-pointer"
              >
                <FaRegHeart className="text-white hover:text-red-500" />
              </button>
            )}
          </div>

          {product.author && (
            <p className="text-md text-gray-300 mb-4 italic">
              par {product.author}
            </p>
          )}
          <p className="text-sm text-purple-300 mb-4 font-medium">
            Catégorie : {product.category.name}
          </p>
          {product.description && (
            <p className="text-gray-200 mb-6">{product.description}</p>
          )}

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
            {product.numberOfPages && (
              <div>
                <span className="font-semibold text-gray-400">Pages: </span>{" "}
                {product.numberOfPages}
              </div>
            )}
            <div>
              <span className="font-semibold text-gray-400">Prix: </span>
              {formatCurency(product.price)}
            </div>
          </div>
          {product.quantity > 0 && (
            <button
              disabled={isInCart ? true : false}
              onClick={handleAdToCart}
              className="mt-3 px-4 py-2.5 rounded-lg font-medium text-sm tracking-wide transition-all duration-200 flex items-center justify-center
               bg-emerald-700 hover:bg-emerald-600 text-white shadow hover:shadow-md
               disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed
               focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 cursor-pointer"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isInCart ? "M5 13l4 4L19 7" : "M12 6v6m0 0v6m0-6h6m-6 0H6"}
                />
              </svg>
              {isInCart ? "Déjà dans le panier" : "Ajouter au panier"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
