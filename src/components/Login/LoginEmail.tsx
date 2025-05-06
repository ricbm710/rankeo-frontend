import { useState } from "react";
import { isValidEmail } from "../../utils/miscutils/inputValidation";

type Props = {
  onNext: (email: string) => void;
};

const LoginEmail = ({ onNext }: Props) => {
  const [emailInput, setEmailInput] = useState<string>("");

  const [inputError, setInputError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isValidEmail(emailInput)) {
      onNext(emailInput);
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
