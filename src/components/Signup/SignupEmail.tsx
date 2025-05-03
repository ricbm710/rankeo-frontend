import { useState } from "react";
//rrd
import { useNavigate } from "react-router-dom";
//types
import { CreateUserInput } from "../../types/createUserInput";
//db-utils
import { createUser, emailLogin } from "../../utils/dbutils/userOperations";
//misc-utils
import { isValidEmail } from "../../utils/miscutils/inputValidation";

const SignupEmail = () => {
  const navigate = useNavigate();

  const [inputData, setInputData] = useState<CreateUserInput>({
    name: "",
    email: "",
    auth_provider: "local",
    // provider_id: '',
    password: "",
  });

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

    const newErrors: typeof inputErrors = {};
    if (!inputData.email || !isValidEmail(inputData.email))
      newErrors.email = "Correo inválido";
    if (!inputData.password || inputData.password.length < 6)
      newErrors.password = "Contraseña debe tener 6 caracteres mínimo";
    if (!inputData.name) newErrors.name = "Escribe un nombre de usuario";

    setInputErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const createResult = await createUser(inputData); //TODO
        // Do something with result if needed (e.g., redirect, show success message)
        console.log(createResult);
        // Login immediately
        const { email, password } = inputData;
        if (email && password) {
          const loginResult = await emailLogin({
            email,
            password,
          });
          console.log(loginResult);
        }

        navigate("/");
      } catch (error) {
        // Handle error (e.g., show toast, display message in UI)
        console.error("Error al crear el usuario:", error); //TODO
      }
    }
  };

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
