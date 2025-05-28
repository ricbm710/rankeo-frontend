// axios
import axios from "axios";
//utils
import { handleAxiosError } from "./handleAxiosErrors";

const API_URL = import.meta.env.VITE_API_URL;

export const getPostsWithVotes = async (page: number = 1) => {
  const url = new URL(`posts?page=${page}`, API_URL).toString();

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};
