import { useState } from "react";
//utils
import { isValidEmail } from "../../utils/miscutils/inputValidation";
import { checkEmailExists } from "../../utils/dbutils/userOperations";
//react-icons
import { FaFacebookF, FaGoogle } from "react-icons/fa";
//rrd
import { useNavigate } from "react-router-dom";

type Props = {
  onNext: (email: string) => void;
};

const LoginEmail = ({ onNext }: Props) => {
  const [emailInput, setEmailInput] = useState<string>("");

  const [inputError, setInputError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isValidEmail(emailInput)) {
      //reset
      setInputError(null);
      // check db
      try {
        const emailExists = await checkEmailExists(emailInput);
        if (emailExists) {
          onNext(emailInput);
        } else {
          setInputError("Este correo no corresponde con ninguna cuenta.");
        }
      } catch (error) {
        console.log("No se pudo verificar el correo.");
        setInputError("No se pudo verificar el correo.");
      }
    } else {
      setInputError("Correo Inválido.");
    }
  };

  return (
    <div className="flex flex-col">
      <form className="p-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Ingresa tu correo"
          onChange={(e) => setEmailInput(e.target.value)}
        />
        {inputError && (
          <p className="text-red-500 text-xs p-1">* {inputError}</p>
        )}
        <button type="submit" className="btn-full mt-4">
          Continuar
        </button>
      </form>
      <div className="p-4 border-t-2 border-col3">
        <h2 className="text-center text-sm mb-2 mt-2">O inicia sesión con:</h2>
        <div
          className="button-like flex flex-row justify-center items-center mb-2 cursor-pointer gap-2"
          onClick={() => navigate("/auth/facebook")}
        >
          <FaFacebookF color="#0077b6" size="1.2em" />
          <div>Facebook</div>
        </div>
        <div
          className="button-like flex flex-row justify-center items-center mb-2 cursor-pointer gap-2"
          onClick={() => navigate("/auth/google")}
        >
          <FaGoogle color="#0077b6" size="1.2em" />
          <div>Google</div>
        </div>
      </div>
    </div>
  );
};

export default LoginEmail;
