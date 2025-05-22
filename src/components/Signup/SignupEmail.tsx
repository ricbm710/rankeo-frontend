import { useState } from "react";
//rrd
import { Navigate, useNavigate } from "react-router-dom";
//types
import { CreateUserInput } from "../../types/createUserInput";
//db-utils
import {
  checkEmailExists,
  createUser,
  emailLogin,
  getCurrentUser,
} from "../../utils/dbutils/userOperations";
//misc-utils
import { isValidEmail } from "../../utils/miscutils/inputValidation";
//custom hooks
import { useUser } from "../../hooks/useUser";

const SignupEmail = () => {
  const navigate = useNavigate();

  const { setUser, user, loading } = useUser();

  const [inputData, setInputData] = useState<CreateUserInput>({
    name: "",
    email: "",
    auth_provider: "local",
    // provider_id: '',
    password: "",
  });

  const [loginError, setLoginError] = useState<string | null>(null);

  const [inputErrors, setInputErrors] = useState<{
    email?: string;
    name?: string;
    password?: string;
  }>({});

  /* -------------------------------------------------------------------- handler functions */

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const hasErrors = await hasValidationErrors(); // <-- Call and await it

    if (hasErrors) return; // Stop if validation failed

    try {
      // Create User
      await createUser(inputData);

      // Login immediately
      const { email, password } = inputData;
      if (email && password) {
        await emailLogin({
          email,
          password,
        });
      }

      const freshUser = await getCurrentUser(); // ⏱️ Fetch from backend
      setUser(freshUser); // ✅ Set latest info

      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        setLoginError(error.message);
      } else {
        setLoginError("Error de Servidor.");
      }
    }
  };

  // ----------------------------------------------------------------------> misc util

  const hasValidationErrors = async () => {
    const newErrors: typeof inputErrors = {};

    if (!inputData.email || !isValidEmail(inputData.email)) {
      newErrors.email = "Correo inválido.";
    } else {
      try {
        const emailExists = await checkEmailExists(inputData.email);
        if (emailExists) {
          newErrors.email = "Este correo ya está siendo usado.";
        }
      } catch (error) {
        newErrors.email = "No se pudo verificar el correo.";
      }
    }

    if (!inputData.password || inputData.password.length < 6) {
      newErrors.password = "Contraseña debe tener 6 caracteres mínimo.";
    }

    if (!inputData.name) {
      newErrors.name = "Escribe un nombre de usuario.";
    }

    setInputErrors(newErrors);

    return Object.keys(newErrors).length > 0;
  };

  /* -------------------------------------------------------------------- user session verification */

  if (loading) {
    return <p>Verificando Usuario...</p>;
  }

  if (user) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <div className="p-2 mt-8">
      <h3 className="text-center text-xl text-col3 font-bold mb-4">
        Registrate con Correo
      </h3>
      <form className="mb-2" onSubmit={handleSubmit} noValidate>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Ingresa tu correo"
          onChange={handleChange}
        />
        {inputErrors.email && (
          <p className="text-red-500 text-xs p-1">* {inputErrors.email}</p>
        )}
        <input
          type="name"
          name="name"
          id="name"
          placeholder="Ingresa tu nombre de usuario"
          className="mt-2"
          onChange={handleChange}
        />
        {inputErrors.name && (
          <p className="text-red-500 text-xs p-1">* {inputErrors.name}</p>
        )}
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Ingresa tu contraseña"
          className="mt-2"
          onChange={handleChange}
        />
        {inputErrors.password && (
          <p className="text-red-500 text-xs p-1">* {inputErrors.password}</p>
        )}
        <button type="submit" className="btn-full mt-4">
          Continuar
        </button>
      </form>
      <div className="flex flex-row gap-2 items-center justify-center">
        <p>Ya tienes una cuenta?</p>
        <button className="link-button" onClick={() => navigate("/login")}>
          Inicia Sesión
        </button>
      </div>
    </div>
  );
};

export default SignupEmail;
