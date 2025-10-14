import axios from "axios";

type FetchStationeryParams = {
  page: number;
  selectedSubCategory?: string;
  productStatus?: string | undefined;
  title?: string;
};

const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function fetchStationery({
  page,
  selectedSubCategory,
  title,
  productStatus,
}: FetchStationeryParams) {
  try {
    const res = await axios.get(`${BASE_URL}/api/products`, {
      params: {
        title,
        category: "Papeterie",
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
