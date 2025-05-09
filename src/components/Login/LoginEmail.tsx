import { useState } from "react";
import { isValidEmail } from "../../utils/miscutils/inputValidation";
import { checkEmailExists } from "../../utils/dbutils/userOperations";

type Props = {
  onNext: (email: string) => void;
};

const LoginEmail = ({ onNext }: Props) => {
  const [emailInput, setEmailInput] = useState<string>("");

  const [inputError, setInputError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isValidEmail(emailInput)) {
      //reset
      setInputError(null);
      // check db
      try {
        const emailExists = await checkEmailExists(emailInput);
        if (!emailExists) {
          onNext(emailInput);
        } else {
          setInputError("Este correo ya está siendo utilizado.");
        }
      } catch (error) {
        console.log("No se pudo verificar el correo.");
        setInputError("No se pudo verificar el correo.");
      }
    } else {
      setInputError("Correo Inválido");
    }
  };

  return (
    <form className="p-4" onSubmit={handleSubmit}>
      <input
        type="text"
        name="email"
        id="email"
        placeholder="Ingresa tu correo"
        onChange={(e) => setEmailInput(e.target.value)}
      />
      {inputError && <p className="text-red-500 text-xs p-1">* {inputError}</p>}
      <button type="submit" className="btn-full mt-4">
        Continuar
      </button>
    </form>
  );
};

export default LoginEmail;
