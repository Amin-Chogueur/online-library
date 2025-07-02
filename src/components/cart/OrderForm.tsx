import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderFormSchema } from "../../helpers/formsSchema";

import {
  FiCheckCircle,
  FiHome,
  FiLoader,
  FiMail,
  FiPhone,
  FiUser,
} from "react-icons/fi";
import React from "react";
import type { z } from "zod";
import Input from "../ui/Input";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useNavigate } from "react-router-dom";
import { placeOrder } from "../../store/slices/cart/cartThunk";
export type OrderFormSchema = z.infer<typeof orderFormSchema>;

function OrderForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    cart: cartItems,
    errorPlacingOrderMessage,
    loadingPlacingOrder,
  } = useAppSelector((state) => state.cart);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OrderFormSchema>({
    mode: "onChange",
    resolver: zodResolver(orderFormSchema),
    criteriaMode: "all",
    defaultValues: {
      fullName: "",
      email: "",
      mobile: "",
      address: "",
    },
  });

  function handleSendOrder(clientInfo: OrderFormSchema) {
    dispatch(placeOrder({ clientInfo, cartItems })).then(() => {
      navigate("/succès");
      reset();
    });
  }
  const orderInput = [
    {
      lable: "Nom",
      type: "text",
      register: { ...register("fullName") },
      error: errors.fullName,
      icon: <FiUser className="text-amber-400" />,
    },
    {
      lable: "Mail",
      type: "text",
      register: { ...register("email") },
      error: errors.email,
      icon: <FiMail className="text-amber-400" />,
    },
    {
      lable: "Téléphone",
      type: "tel",
      register: { ...register("mobile") },
      error: errors.mobile,
      icon: <FiPhone className="text-amber-400" />,
    },
    {
      lable: "Address",
      register: { ...register("address") },
      error: errors.address,
      icon: <FiHome className="text-amber-400" />,
    },
  ];
  return (
    <form
      onSubmit={handleSubmit(handleSendOrder)}
      className="bg-gray-800 p-6 rounded-xl border border-gray-700 space-y-4"
    >
      <h2 className="text-xl font-bold text-amber-400 mb-4">
        Informations de contact
      </h2>
      {orderInput.map((input) => (
        <Input key={input.lable} {...input} />
      ))}
      {errorPlacingOrderMessage && (
        <p className="text-red-500 text-sm text-center">
          {errorPlacingOrderMessage}
        </p>
      )}
      <button
        disabled={loadingPlacingOrder === "pending"}
        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:bg-gray-600"
        type="submit"
      >
        {loadingPlacingOrder === "pending" ? (
          <FiLoader className="animate-spin" />
        ) : (
          <FiCheckCircle />
        )}{" "}
        {loadingPlacingOrder === "pending"
          ? "Envoi..."
          : " Envoyer la commande"}
      </button>
    </form>
  );
}
export default React.memo(OrderForm);
