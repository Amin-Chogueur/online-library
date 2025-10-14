import axios from "axios";

type FetchBooksParams = {
  page: number;
  selectedSubCategory?: string;
  productStatus?: string | undefined;
  title?: string;
};

const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function fetchBooks({
  page,
  selectedSubCategory,
  title,
  productStatus,
}: FetchBooksParams) {
  try {
    const res = await axios.get(`${BASE_URL}/api/products`, {
      params: {
        title,
        category: "Romans",
        subCategory: selectedSubCategory,
        productStatus: productStatus,
        page,
      },
    });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || "An error occurred";
    }

    return "An unknown error occurred";
  }
}

export async function fetchProduct(title: string) {
  try {
    const res = await axios.get(`${BASE_URL}/api/products/${title}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || "An error occurred";
    }

    return "An unknown error occurred";
  }
}
