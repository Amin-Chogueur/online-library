import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { fetchAllBooks } from "../store/slices/bookSlices";
import CartItem from "../components/cart/CartItem";
import { FiShoppingCart } from "react-icons/fi";

import OrderSummary from "../components/cart/OrderSummary";
import OrderForm from "../components/cart/OrderForm";
import EmptyCart from "../components/cart/EmptyCart";

export default function Cart() {
  const books = useAppSelector((state) => state.books.books);
  const cart = useAppSelector((state) => state.cart.cart);

  const booksInCart = cart.map((item) => {
    const book = books.find((book) => book._id === item._id);
    if (book) {
      const bookInCart = {
        ...book,
        quantityInCart: item.quantityInCart,
      };
      return bookInCart;
    }
  });
  const totalPrice = booksInCart.reduce(
    (acu, cur) => acu + (cur?.quantityInCart ?? 0) * (cur?.price ?? 0),
    0
  );
  const oredrMessage = false;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllBooks());
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
              {booksInCart.map((item) => (
                <CartItem key={item?._id} item={item!} />
              ))}
            </div>

            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <p className="text-gray-300 text-lg leading-relaxed">
                Pour procéder à votre commande, veuillez remplir le formulaire
                avec vos informations. Une fois que nous aurons vos coordonnées,
                nous vous contacterons par téléphone pour discuter des options
                de paiement et de la manière dont vous souhaitez recevoir votre
                commande.
              </p>
            </div>
          </div>

          {/* Summary and Form Section */}
          <div className="lg:w-[30%] space-y-6">
            {/* Order Summary */}
            <OrderSummary totalPrice={totalPrice} />
            {/* Contact Form */}
            <OrderForm />
          </div>
        </div>
      ) : (
        <div className="text-center py-16">
          <EmptyCart />

          {oredrMessage && (
            <div className="mt-12 bg-gray-800 p-6 rounded-xl max-w-2xl mx-auto">
              <p className="text-amber-500 text-xl">
                Merci de nous avoir choisis ! Nous avons bien reçu votre
                commande et nous vous contacterons sous peu pour plus de détails
                concernant l'expédition et les options de paiement.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
