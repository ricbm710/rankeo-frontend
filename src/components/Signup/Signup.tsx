//rrd
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  return (
    <div className="p-2 mt-8">
      <h3 className="text-center text-xl text-col3 font-bold mb-4">
        Registrate
      </h3>
      <div
        className="button-like flex flex-col justify-center items-center mb-2 cursor-pointer"
        onClick={() => navigate("/signup/email")}
      >
        Correo Electronico
      </div>
      <div
        className="button-like flex flex-col justify-center items-center mb-2 cursor-pointer"
        onClick={() => navigate("/auth/facebook")}
      >
        Facebook
      </div>
      <div
        className="button-like flex flex-col justify-center items-center mb-2 cursor-pointer"
        onClick={() => navigate("/auth/google")}
      >
        Gmail
      </div>
      <div className="flex flex-row gap-2 items-center justify-center">
        <p>Ya tienes una cuenta?</p>
        <button className="link-button" onClick={() => navigate("/login")}>
          Inicia Sesión
        </button>
      </div>
    </div>
  );
};

export default Signup;
