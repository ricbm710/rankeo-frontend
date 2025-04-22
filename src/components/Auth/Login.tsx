import { useState } from "react";
//components
import EnterEmail from "./EnterEmail";
import EnterPassword from "./EnterPassword";

const Login = () => {
  const [step, setStep] = useState<"email" | "password">("email");

  return (
    <div className="p-2 mt-8 ">
      <h3 className="text-center text-xl text-col3 font-bold">Inicia Sesión</h3>
      {step === "email" && <EnterEmail />}
      {step === "password" && <EnterPassword />}
    </div>
  );
};

export default Login;
