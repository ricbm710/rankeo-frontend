//axios
import axios from "axios";
//types
import { CreateUserInput } from "../../types/createUserInput";
import { EmailLoginInput } from "../../types/emailLoginInput";
//utils
import { handleAxiosError } from "./handleAxiosErrors";
import { PostPreview } from "../../types/postPreview";

const API_URL = import.meta.env.VITE_API_URL;

export const createUser = async (data: CreateUserInput) => {
  // Ensure the API URL is correctly formatted
  const url = new URL("users", API_URL).toString();

  const { name, email, auth_provider, provider_id, password } = data;

  try {
    const response = await axios.post(url, {
      name,
      email,
      auth_provider,
      provider_id,
      password,
    });

    return response.data; // You might want to return the response if you need to handle it later
  } catch (error) {
    handleAxiosError(error);
  }
};

/* --------------------------------------------------------------------  */
export const emailLogin = async (data: EmailLoginInput) => {
  const { email, password } = data;

  const url = new URL("login", API_URL).toString();

  try {
    const response = await axios.post(
      url,
      {
        email,
        password,
      },
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

/* --------------------------------------------------------------------  */

export const getCurrentUser = async () => {
  const url = new URL("me", API_URL).toString();

  try {
    const response = await axios.get(url, { withCredentials: true });
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

/* --------------------------------------------------------------------  */

export const checkEmailExists = async (email: string) => {
  const url = new URL("check-email", API_URL);
  url.searchParams.append("email", email);

  try {
    const response = await axios.get(url.toString());
    return response.data.exists;
  } catch (error) {
    handleAxiosError(error);
  }
};

/* --------------------------------------------------------------------  */

export const logoutUser = async () => {
  const url = new URL("logout", API_URL).toString();
  try {
    const response = await axios.post(
      url,
      {},
      { withCredentials: true } // This is KEY to send the auth_token cookie!
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const getFullUserProfile = async () => {
  const url = new URL("user", API_URL).toString();
  try {
    const response = await axios.get(url, { withCredentials: true });
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const getUserPosts = async (
  userId: number
): Promise<PostPreview[] | null> => {
  try {
    const url = new URL(`users/${userId}/posts`, API_URL).toString();
    const response = await axios.get(url);

    // Expecting { posts: [...] }
    return response.data.posts;
  } catch (error) {
    handleAxiosError(error);
    return null;
  }
};
