import type { CategoryType } from "./category";

export type BookType = {
  _id?: string;
  image: string;
  title: string;
  author: string;
  numberOfPages: string;
  price: string;
  quantity: number;
  category: CategoryType;
  createdAt?: string;
  description: string;
};
