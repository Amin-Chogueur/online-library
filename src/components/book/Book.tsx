import { Link } from "react-router-dom";
import type { BookType } from "../../type/book";

export default function Book({ book }: { book: BookType }) {
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
          <div className="flex justify-between items-center mb-3">
            <span className="text-lg font-bold text-teal-400">
              ${(parseInt(book.price) / 100).toFixed(2)}
            </span>
            <span
              className={`px-2 py-1 text-xs rounded-full font-medium ${
                book.quantity > 3
                  ? "bg-green-200 text-green-900"
                  : book.quantity > 0
                    ? "bg-red-400 text-red-700"
                    : "bg-red-600 text-white"
              }`}
            >
              {book.quantity > 0
                ? `${book.quantity} en stock`
                : "Rupture de stock"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
