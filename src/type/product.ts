import type { SubCategoryType } from "./subCategory";

export type ProductType = {
  _id?: string;
  image: string;
  title: string;
  author?: string;
  numberOfPages?: string;
  price: number;
  promoPrice?: number;
  quantity: number;
  minQuantity: number;
  numberOfSales?: number;
  productStatus: string | undefined;
  category: "Romans" | "Papeterie" | "Enfants" | "Jeux et Cadeaux";
  subCategory?: SubCategoryType | undefined;
  createdAt?: string;
  description?: string;
  quantityInCart?: number;
};
