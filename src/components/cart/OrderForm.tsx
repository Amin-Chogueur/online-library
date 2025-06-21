import axios, { isAxiosError } from "axios";

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
import React, { useState } from "react";
import type { z } from "zod";
import Input from "../ui/Input";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { clearCart } from "../../store/slices/cartSlice";
export type OrderFormSchema = z.infer<typeof orderFormSchema>;

function OrderForm({
  setSuccessOrderMessage,
}: {
  setSuccessOrderMessage: React.Dispatch<React.SetStateAction<string>>;
}) {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.cart);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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

  async function onSendOrder(clientInfo: OrderFormSchema) {
    try {
      setErrorMessage("");
      setLoading(true);
      const res = await axios.post(
        "https://ghiz-read-manager.vercel.app/api/orders",
        {
          clientInfo,
          cartItems,
        }
      );

      if (res.data.status === 200) {
        console.log(res.data);
        dispatch(clearCart());
        setSuccessOrderMessage(res.data.message);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        setErrorMessage(
          error.response?.data?.message || "Échec de l'envoi de la commonde"
        );
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  function handleSendOrder(data: OrderFormSchema) {
    onSendOrder(data);
    reset();
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
      {errorMessage && (
        <p className="text-red-500 text-sm text-center">{errorMessage}</p>
      )}
      <button
        disabled={loading}
        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:bg-gray-600"
        type="submit"
      >
        {loading ? <FiLoader className="animate-spin" /> : <FiCheckCircle />}{" "}
        {loading ? "Envoi..." : " Envoyer la commande"}
      </button>
    </form>
  );
}
export default React.memo(OrderForm);
