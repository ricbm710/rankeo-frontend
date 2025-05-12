import axios from "axios";

export const handleAxiosError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;

    // Try to grab backend message or fallback
    const message =
      typeof data === "string"
        ? data
        : data?.message || data?.error || "Error de Servidor.";

    throw new Error(message);
  }

  throw new Error("Error de Servidor.");
};
