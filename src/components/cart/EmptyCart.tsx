import { FaBoxOpen } from "react-icons/fa";

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
    </div>
  );
}
