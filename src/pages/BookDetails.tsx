import { FiArrowLeft } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import Spinner from "../components/ui/Spinner";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { useEffect } from "react";
import { fetchBook } from "../store/slices/bookSlices";
import { formatCurency } from "../helpers/formatCurency";
import { addToCart } from "../store/slices/cartSlice";

export default function BookDetail() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.cart);
  const { title } = useParams();
  const { book, bookLoading } = useAppSelector((state) => state.books);
  const isInCart = cart.find((item) => item._id === book?._id);
  function handleAdToCart(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault(); // prevents the <Link> default action
    e.stopPropagation();
    dispatch(addToCart(book?._id));
  }

  useEffect(() => {
    dispatch(fetchBook(title as string));
  }, [dispatch, title]);
  return (
    <div className=" max-w-5xl mx-auto  text-gray-100 mb-[20px]">
      <h1 className="text-3xl font-bold text-amber-500 text-center mb-12">
        Détails du livre
      </h1>

      {bookLoading === "pending" ? (
        <Spinner />
      ) : (
        book && (
          <div className="relative flex flex-col md:flex-row gap-8 bg-gray-800 p-3 rounded-xl shadow-lg">
            {/* Image du livre */}
            <div className="w-full md:w-1/3">
              <img
                src={book.image}
                alt={book.title}
                width={400}
                height={600}
                className="rounded-lg w-full h-auto object-cover shadow-md"
              />
            </div>

            {/* Informations du livre */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-amber-500 mb-2">
                {book.title}
              </h1>
              <p className="text-md text-gray-300 mb-4 italic">
                par {book.author}
              </p>
              <p className="text-sm text-purple-300 mb-4 font-medium">
                Catégorie : {book.category.name}
              </p>
              <p className="text-gray-200 mb-6">{book.description}</p>

              <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
                <div>
                  <span className="font-semibold text-gray-400">Pages: </span>{" "}
                  {book.numberOfPages}
                </div>
                <div>
                  <span className="font-semibold text-gray-400">Prix: </span>
                  {formatCurency(book.price)}
                </div>
              </div>
              <button
                disabled={isInCart ? true : false}
                onClick={handleAdToCart}
                className="bg-amber-600 hover:bg-amber-700 px-2 py-1 rounded-lg mt-5 cursor-pointer disabled:bg-gray-500"
              >
                {isInCart ? "Déjà dans le panier" : "Ajouter au panier"}
              </button>
              <Link
                to={"/books"}
                className="flex gap-2 items-center absolute top-[-30px] left-0 text-amber-500 underline"
              >
                <FiArrowLeft size={24} />
                <span>Retour à la liste</span>
              </Link>
            </div>
          </div>
        )
      )}
    </div>
  );
}
