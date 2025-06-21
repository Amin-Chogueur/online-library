import axios, { isAxiosError } from "axios";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema } from "../../helpers/formsSchema";

import { FiHome, FiLoader, FiMail, FiPhone, FiUser } from "react-icons/fi";
import { useState } from "react";
import type { z } from "zod";
import Input from "../ui/Input";
export type ContactFormData = z.infer<typeof contactFormSchema>;
export default function ContactForm({ isInView }: { isInView: boolean }) {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    mode: "onChange",
    resolver: zodResolver(contactFormSchema),
    criteriaMode: "all",
    defaultValues: {
      fullName: "",
      email: "",
      mobile: "",
      message: "",
    },
  });

  async function onSendMessage(clientMessageData: ContactFormData) {
    try {
      setErrorMessage("");
      setSuccessMessage("");
      setLoading(true);
      const res = await axios.post(
        "https://ghiz-read-manager.vercel.app/api/contact",
        {
          clientMessageData,
        }
      );

      if (res.data.status === 200) {
        setSuccessMessage(res.data.message);
      }
    } catch (error) {
      console.log(error);
      if (isAxiosError(error)) {
        setErrorMessage(
          error.response?.data?.message || "Échec de l'envoi de l'email"
        );
      }
    } finally {
      setLoading(false);
    }
  }
  function handleSendMessage(data: ContactFormData) {
    onSendMessage(data);
    reset();
  }
  const contactInput = [
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
      lable: "Message",
      register: { ...register("message") },
      error: errors.message,
      icon: <FiHome className="text-amber-400" />,
    },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }} // Start off-screen (right)
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }} // Animate in when in view
      transition={{ duration: 1 }}
      className=" w-full"
    >
      <form
        onSubmit={handleSubmit(handleSendMessage)}
        className="border text-accent border-gray-500 p-3 rounded-lg flex flex-col gap-4 w-full  shadow-md"
      >
        {contactInput.map((input) => (
          <Input key={input.lable} {...input} />
        ))}

        <button
          disabled={loading}
          className="bg-amber-600 text-white py-2 rounded-md hover:bg-amber-500 focus:outline-none w-full md:w-auto cursor-pointer disabled:bg-gray-600 flex justify-center items-center gap-2"
          type="submit"
        >
          {loading && <FiLoader className="animate-spin" />}
          {loading ? "Envoi..." : "Envoyer le message"}
        </button>

        <div>
          {successMessage && (
            <p className="text-green-500 text-sm text-center">
              {successMessage}
            </p>
          )}
          {errorMessage && (
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
          )}
        </div>
      </form>
    </motion.div>
  );
}
