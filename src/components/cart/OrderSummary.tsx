import { formatCurency } from "../../helpers/formatCurency";
import { useAppSelector } from "../../hooks/reduxHooks";

export default function OrderSummary({ totalPrice }: { totalPrice: number }) {
  const cart = useAppSelector((state) => state.cart.cart);
  const totalQuantity = cart.reduce((acu, cur) => acu + cur.quantityInCart, 0);
  return (
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
      <h2 className="text-xl font-bold text-amber-400 mb-4">
        Résumé de la commande
      </h2>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Articles:</span>
          <span className="font-medium">{totalQuantity}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Total:</span>
          <span className="text-amber-400 font-bold text-xl">
            {formatCurency(totalPrice)}
          </span>
        </div>
      </div>
    </div>
  );
}
