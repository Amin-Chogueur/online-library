import { Link } from "react-router-dom";
import type { BookType } from "../../type/book";
import { formatCurency } from "../../helpers/formatCurency";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { addToCart } from "../../store/slices/cartSlice";

export default function Book({ book }: { book: BookType }) {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.cart);
  const isInCart = cart.find((item) => item._id === book._id);
  function handleAdToCart(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault(); // prevents the <Link> default action
    e.stopPropagation();
    dispatch(addToCart(book._id));
  }

  return (
    <Link
      to={`/books/${book.title.replace(/ /g, "_")}`}
      key={book._id}
      className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col "
    >
      <div className="h-64 overflow-hidden">
        <img
          width={350}
          height={300}
          src={book.image}
          alt={book.title}
          className="w-full h-full  hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h2 className="text-lg font-semibold text-amber-400 mb-2 line-clamp-2">
          {book.title}
        </h2>
        <p className="text-sm text-gray-300 mb-1">par {book.author}</p>

        {/* 🆕 Category display */}
        <p className="text-xs text-purple-300 mb-1 italic">
          Catégorie : {book.category.name}
        </p>

        <p className="text-xs text-gray-400 mb-3">{book.numberOfPages} pages</p>

        <div className="mt-auto">
          <span className="text-lg font-bold text-teal-400">
            {formatCurency(book.price)}
          </span>
        </div>
        <button
          disabled={isInCart ? true : false}
          onClick={handleAdToCart}
          className="bg-amber-700 hover:bg-amber-600 px-2 py-1 rounded-lg mt-5 cursor-pointer disabled:bg-gray-500"
        >
          {isInCart ? "Déjà dans le panier" : "Ajouter au panier"}
        </button>
      </div>
    </Link>
  );
}
