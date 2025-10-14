import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
export async function fetchCategories(category: string | null) {
  try {
    const res = await axios.get(`${BASE_URL}/api/categories/client`, {
      params: {
        category,
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
