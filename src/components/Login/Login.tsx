import { useState } from "react";
//components
import LoginEmail from "./LoginEmail";
import LoginPassword from "./LoginPassword";
//rrd
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [step, setStep] = useState<"email" | "password">("email");
  const [email, setEmail] = useState<string>("");

  const navigate = useNavigate();

  /* -------------------------------------------------------------------- handler functions */

  const handleEmailSubmit = (submittedEmail: string) => {
    setEmail(submittedEmail);
    setStep("password");
  };

  const handleBacktoEmail = () => {
    setStep("email");
  };

  return (
    <div className="p-2 mt-8">
      <h3 className="text-center text-xl text-col3 font-bold">Inicia Sesión</h3>
      {step === "email" && <LoginEmail onNext={handleEmailSubmit} />}
      {step === "password" && (
        <LoginPassword email={email} onBack={handleBacktoEmail} />
      )}
      <div className="flex flex-row gap-2 items-center justify-center">
        <p>No tienes una cuenta?</p>
        <button className="link-button" onClick={() => navigate("/signup")}>
          Regístrate
        </button>
      </div>
    </div>
  );
};

export default Login;
