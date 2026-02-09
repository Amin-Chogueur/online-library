import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function fetchEvents() {
  try {
    const res = await axios.get(`${BASE_URL}/api/events`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || "An error occurred";
    }

    return "An unknown error occurred";
  }
}

export async function fetchEvent(id: string) {
  try {
    const res = await axios.get(`${BASE_URL}/api/events/${id}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || "An error occurred";
    }

    return "An unknown error occurred";
  }
}
