import { useState } from "react";
//rrd
import { useNavigate } from "react-router-dom";
import { CreateUserInput } from "../../types/createUserInput";

const SignupEmail = () => {
  const navigate = useNavigate();

  const [inputData, setInputData] = useState<CreateUserInput>({
    name: "",
    email: "",
    auth_provider: "local",
    // provider_id: '',
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="p-2 mt-8">
      <h3 className="text-center text-xl text-col3 font-bold mb-4">
        Registrate con Correo
      </h3>
      <form className="mb-2" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Ingresa tu correo"
          onChange={handleChange}
        />
        <input
          type="name"
          name="name"
          id="name"
          placeholder="Ingresa tu nombre de usuario"
          className="mt-2"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Ingresa tu contraseña"
          className="mt-2"
          onChange={handleChange}
        />
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
