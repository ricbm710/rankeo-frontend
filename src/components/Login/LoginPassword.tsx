import { useState } from "react";
//utils
import { emailLogin, getCurrentUser } from "../../utils/dbutils/userOperations";
//custom hooks
import { useUser } from "../../hooks/useUser";
//rrd
import { useNavigate } from "react-router-dom";

type Props = {
  email: string;
  onBack: () => void;
};

const LoginPassword = ({ email, onBack }: Props) => {
  const [passwordInput, setPasswordInput] = useState<string>("");

  const [loginError, setLoginError] = useState<string | null>(null);

  const { setUser } = useUser();

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (passwordInput.length < 6) {
      setLoginError("Contraseña debe tener 6 caracteres mínimo");
    } else {
      setLoginError(null);
      try {
        await emailLogin({ email, password: passwordInput });

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
    }
  };

  return (
    <form className="p-4" onSubmit={handleSubmit}>
      <div className="input-like">
        <div>{email}</div>
      </div>
      <button className="link-button" onClick={onBack}>
        Cambiar correo
      </button>
      <input
        type="password"
        name="password"
        id="password"
        className="mt-2"
        placeholder="Ingresa tu contraseña"
        onChange={handleChange}
      />
      {loginError && <p className="text-red-500 text-xs p-1">* {loginError}</p>}
      <button type="submit" className="btn-full mt-4">
        Continuar
      </button>
    </form>
  );
};

export default LoginPassword;
