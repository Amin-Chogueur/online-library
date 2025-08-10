import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";

import CartItem from "../components/cart/CartItem";
import { FiShoppingCart } from "react-icons/fi";

import OrderSummary from "../components/cart/OrderSummary";
import OrderForm from "../components/cart/OrderForm";
import EmptyCart from "../components/cart/EmptyCart";
import Spinner from "../components/ui/Spinner";
import { fetchProductsInCart } from "../store/slices/cart/cartThunk";

export default function Cart() {
  const dispatch = useAppDispatch();
  const { cart, productsInCart, productsInCartLoading } = useAppSelector(
    (state) => state.cart
  );
  const cartItems = productsInCart.map((product) => {
    const cartItem = cart.find((item) => item._id === product._id);
    return {
      ...product,
      quantityInCart: cartItem?.quantityInCart || 0,
    };
  });

  const totalPrice = cartItems.reduce(
    (acu, cur) =>
      acu +
      (cur?.quantityInCart ?? 0) *
        (cur.promoPrice && cur.promoPrice > 0 ? cur?.promoPrice : cur.price),
    0
  );

  useEffect(() => {
    dispatch(fetchProductsInCart());
  }, [dispatch]);
  return (
    <div className="min-h-[100vh] pt-[10px] pb-24  ">
      <h1 className="text-amber-500 text-3xl font-bold text-center mb-8">
        <FiShoppingCart className="text-4xl inline mr-2" />
        <span>Articles dans votre panier</span>
      </h1>

      {cart.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items Section */}
          <div className="lg:w-[70%]">
            <div className="flex flex-col gap-4 mb-6">
              {productsInCartLoading === "pending" ? (
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
            <OrderForm />
          </div>
        </div>
      ) : (
        <div className="text-center py-16">
          <EmptyCart />
        </div>
      )}
    </div>
  );
}
