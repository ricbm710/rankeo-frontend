import { useState } from "react";
//components
import LoginEmail from "./LoginEmail";
import LoginPassword from "./LoginPassword";
//rrd
import { Navigate, useNavigate } from "react-router-dom";
//custom hooks
import { useUser } from "../../hooks/useUser";

const Login = () => {
  const [step, setStep] = useState<"email" | "password">("email");
  const [email, setEmail] = useState<string>("");

  const navigate = useNavigate();

  const { user, loading } = useUser();

  /* -------------------------------------------------------------------- handler functions */

  const handleEmailSubmit = (submittedEmail: string) => {
    setEmail(submittedEmail);
    setStep("password");
  };

  const handleBacktoEmail = () => {
    setStep("email");
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
