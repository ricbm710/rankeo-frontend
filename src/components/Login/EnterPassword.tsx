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

const EnterPassword = ({ email, onBack }: Props) => {
  const [passwordInput, setPasswordInput] = useState<string>("");

  const { setUser } = useUser();

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await emailLogin({ email, password: passwordInput }); // Just login

      const freshUser = await getCurrentUser(); // ⏱️ Fetch from backend
      setUser(freshUser); // ✅ Set latest info

      navigate("/");
    } catch (error) {
      console.error("Error al iniciar sesión.", error); //TODO
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

      <button type="submit" className="btn-full mt-4">
        Continuar
      </button>
    </form>
  );
};

export default EnterPassword;
