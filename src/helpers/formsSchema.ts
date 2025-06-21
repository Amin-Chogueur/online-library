import { z } from "zod";

export const contactFormSchema = z.object({
  fullName: z.string().min(1, "Le nom complet est requis"),
  email: z
    .string()
    .min(1, { message: "L'adresse e-mail est requise" })
    .email({ message: "Adresse e-mail invalide" }),
  mobile: z.string().min(1, "Le numéro de téléphone est requis"),
  message: z.string().min(10, "Le message est requis"),
});

export const orderFormSchema = z.object({
  fullName: z.string().min(1, "Le nom complet est requis"),
  email: z
    .string()
    .min(1, { message: "L'adresse e-mail est requise" })
    .email({ message: "Adresse e-mail invalide" }),
  mobile: z.string().min(1, "Le numéro de téléphone est requis"),
  address: z.string().min(10, "l`adress est requis"),
});
