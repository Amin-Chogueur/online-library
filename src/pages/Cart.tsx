import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";

import CartItem from "../components/cart/CartItem";
import { FiShoppingCart } from "react-icons/fi";

import OrderSummary from "../components/cart/OrderSummary";
import OrderForm from "../components/cart/OrderForm";
import EmptyCart from "../components/cart/EmptyCart";
import { fetchBooksInCart } from "../store/slices/cartSlice";
import Spinner from "../components/ui/Spinner";

export default function Cart() {
  const dispatch = useAppDispatch();
  const [successOrderMessage, setSuccessOrderMessage] = useState("");
  const { cart, booksInCart, booksInCartLoading } = useAppSelector(
    (state) => state.cart
  );

  const cartItems = booksInCart.map((book) => {
    const cartItem = cart.find((item) => item._id === book._id);
    return {
      ...book,
      quantityInCart: cartItem?.quantityInCart || 0,
    };
  });

  const totalPrice = cartItems.reduce(
    (acu, cur) => acu + (cur?.quantityInCart ?? 0) * (cur?.price ?? 0),
    0
  );

  useEffect(() => {
    dispatch(fetchBooksInCart());
  }, [dispatch]);
  return (
    <div className="min-h-[100vh] pt-[10px] pb-24  ">
      <h1 className="text-amber-500 text-3xl font-bold text-center mb-8">
        <FiShoppingCart className="text-4xl inline mr-2" />
        <span>Livres dans votre panier</span>
      </h1>

      {cart.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items Section */}
          <div className="lg:w-[70%]">
            <div className="flex flex-col gap-4 mb-6">
              {booksInCartLoading === "pending" ? (
                <Spinner />
              ) : (
                cartItems.map((item) => (
                  <CartItem key={item._id} item={item!} />
                ))
              )}
            </div>

            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <p className="text-gray-300 text-lg leading-relaxed">
                Pour procéder à votre commande, veuillez remplir le formulaire
                avec vos informations. Une fois que nous aurons vos coordonnées,
                nous vous contacterons par téléphone pour discuter des options
                de paiement et de la manière dont vous souhaitez recevoir votre
                commande.
              </p>
              <p className="border-l-amber-600 border-l-2 pl-4 mt-4">
                En cas de souci lors de la commande, vous pouvez aussi nous
                appeler directement via WhatsApp grâce au bouton en bas à
                droite.
              </p>
            </div>
          </div>

          {/* Summary and Form Section */}
          <div className="lg:w-[30%] space-y-6">
            {/* Order Summary */}
            <OrderSummary totalPrice={totalPrice} />
            {/* Contact Form */}
            <OrderForm setSuccessOrderMessage={setSuccessOrderMessage} />
          </div>
        </div>
      ) : (
        <div className="text-center py-16">
          <EmptyCart />

          {successOrderMessage && (
            <div className="mt-12 bg-gray-800 p-6 rounded-xl max-w-2xl mx-auto">
              <p className="text-amber-500 text-xl">{successOrderMessage}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
