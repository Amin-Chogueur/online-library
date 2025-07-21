import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";

import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";
import { FaBookOpen } from "react-icons/fa";
import { formatCurency } from "../../helpers/formatCurency";
import {
  decresseQuantity,
  incresseQuantity,
  removeFromCart,
} from "../../store/slices/cart/cartSlice";
import type { ProductType } from "../../type/product";
import { fetchProductsInCart } from "../../store/slices/cart/cartThunk";

export default function CartItem({ item }: { item: ProductType }) {
  const error = useAppSelector((state) => state.cart.error);

  const dispatch = useAppDispatch();

  function handleIncressQuantity() {
    dispatch(
      incresseQuantity({
        id: item._id,
        quantity: item.quantity,
      })
    );
  }
  function handleDecressQuantity() {
    dispatch(decresseQuantity(item._id));
  }
  function handleRemoveItemFromCart() {
    dispatch(removeFromCart(item._id));
    //i refetch books cus the ids in the cart was changed so i can kepp the  books in cart page updated
    dispatch(fetchProductsInCart());
  }

  return (
    <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-200">
      {/* Book Image with fallback */}
      <div className="w-16 h-24 overflow-hidden flex-shrink-0 bg-gray-700 rounded flex items-center justify-center">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <FaBookOpen className="text-2xl text-gray-500" />
        )}
      </div>

      {/* Book Info */}
      <div className="flex-1 min-w-0">
        <h2 className="text-lg font-semibold text-amber-400 truncate">
          {item.title}
        </h2>

        {error && error.id === item._id && (
          <p className="text-red-500 text-sm">{error.message}</p>
        )}
        <p className="text-sm text-gray-300 mt-1 flex items-center gap-1">
          <span>Quantité:</span>
          <span className="font-medium">{item.quantityInCart}</span>
        </p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={handleIncressQuantity}
            className="p-1.5 bg-gray-700 hover:bg-amber-500 text-white rounded-full transition-colors duration-200 cursor-pointer"
          >
            <FiPlus className="w-4 h-4" />
          </button>
          <button
            onClick={handleDecressQuantity}
            className="p-1.5 bg-gray-700 hover:bg-amber-500 text-white rounded-full transition-colors duration-200 cursor-pointer"
          >
            <FiMinus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Price and Delete Button */}
      <div className="ml-auto flex flex-col items-end">
        <p className="text-lg font-bold text-amber-400">
          {formatCurency(item.price! * item.quantityInCart!)}
        </p>
        <button
          onClick={handleRemoveItemFromCart}
          className="mt-2 flex items-center gap-1 text-red-400 hover:text-red-300 text-sm font-medium transition-colors duration-200 cursor-pointer"
          aria-label="Remove item"
        >
          <FiTrash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
