import { useState } from "react";

type Props = {
  onNext: (email: string) => void;
};

const EnterEmail = ({ onNext }: Props) => {
  const [emailInput, setEmailInput] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(emailInput);
  };

  return (
    <form className="p-4" onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Ingresa tu correo"
        required
        onChange={(e) => setEmailInput(e.target.value)}
      />
      <button type="submit" className="btn-full mt-4">
        Continuar
      </button>
    </form>
  );
};

export default EnterEmail;
