//axios
import axios from "axios";
//types
import { CreateUserInput } from "../../types/createUserInput";

export const createUser = async (data: CreateUserInput) => {
  const API_URL = import.meta.env.VITE_API_URL;

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
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Backend Error:", error.response?.data?.error);
    } else {
      console.error("Network Error:", error);
    }

    // Accessing error.response safely after narrowing
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        `Unable to create new User. Backend returned: ${error.response.data.error}`
      );
    } else {
      throw new Error("Unable to create new User.");
    }
  }
};
