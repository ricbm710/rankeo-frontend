// axios
import axios from "axios";
//utils
import { handleAxiosError } from "./handleAxiosErrors";

const API_URL = import.meta.env.VITE_API_URL;

type GetPostsWithVotesProps = {
  page: number;
  sortType?: "relevance" | "date";
  sortOrder?: "asc" | "desc";
};

export const getPostsWithVotes = async ({
  page = 1,
  sortType = "relevance",
  sortOrder = "desc",
}: GetPostsWithVotesProps) => {
  const url = new URL(
    `posts?page=${page}&sortType=${sortType}&sortOrder=${sortOrder}`,
    API_URL
  ).toString();

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};
