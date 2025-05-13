//rrd
import { useNavigate } from "react-router-dom";
//react-icons
import { MdEmail } from "react-icons/md";

const Signup = () => {
  const navigate = useNavigate();

  return (
    <div className="p-2 mt-8">
      <h3 className="text-center text-xl text-col3 font-bold mb-4">
        Registrate
      </h3>
      <div
        className="button-like flex flex-row justify-center items-center mb-2 cursor-pointer gap-2"
        onClick={() => navigate("/signup/email")}
      >
        <MdEmail color="#0077b6" size="1.5em" />
        <div>Correo</div>
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
