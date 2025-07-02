import { Link, useNavigate } from "react-router-dom";
import OrderConfirmation from "../components/cart/OrderConfirmation";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { useEffect } from "react";
import { clearSuccesmessage } from "../store/slices/cart/cartSlice";
import { FaBookOpen } from "react-icons/fa6";

export default function Success() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { successPlacingOrderMessage, placedOrder } = useAppSelector(
    (state) => state.cart
  );

  useEffect(() => {
    if (!successPlacingOrderMessage) {
      navigate("/"); // Redirect to homepage if no order data
    }
    return () => {
      dispatch(clearSuccesmessage());
    };
  }, [successPlacingOrderMessage, navigate, dispatch]);
  return (
    <div className="text-center ">
      <OrderConfirmation
        createdOrder={placedOrder}
        message={successPlacingOrderMessage}
      />
      <Link
        to={"/Nos_Livres"}
        className=" mt-3 flex w-fit mx-auto items-center justify-center px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-600 rounded-lg font-medium hover:from-amber-700 hover:to-amber-700 transition-all cursor-pointer"
      >
        <FaBookOpen className="mr-2" />
        Retourner à la collection
      </Link>
    </div>
  );
}
