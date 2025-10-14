import axios from "axios";

type FetchGamesAndGiftsParams = {
  page: number;
  selectedSubCategory?: string;
  productStatus?: string | undefined;
  title?: string;
};

const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function fetchGamesAndGifts({
  page,
  selectedSubCategory,
  title,
  productStatus,
}: FetchGamesAndGiftsParams) {
  try {
    const res = await axios.get(`${BASE_URL}/api/products`, {
      params: {
        title,
        category: "Jeux et Cadeaux",
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
