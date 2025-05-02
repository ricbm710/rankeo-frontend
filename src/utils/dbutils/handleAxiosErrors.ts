import axios from "axios";

export const handleAxiosError = (error: unknown, defaultMessage: string) => {
  if (axios.isAxiosError(error)) {
    console.error("Backend Error:", error.response?.data?.error);
  } else {
    console.error("Network Error:", error);
  }

  if (axios.isAxiosError(error) && error.response) {
    throw new Error(
      `${defaultMessage} Backend returned: ${error.response.data.error}`
    );
  } else {
    throw new Error(defaultMessage);
  }
};
