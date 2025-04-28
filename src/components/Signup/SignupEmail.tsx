//rrd
import { useNavigate } from "react-router-dom";

const SignupEmail = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="p-2 mt-8">
      <h3 className="text-center text-xl text-col3 font-bold mb-4">
        Registrate con Correo
      </h3>
      <form className="mb-2" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Ingresa tu correo"
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Ingresa tu contraseña"
          required
          className="mt-2"
        />
        <button type="submit" className="btn-full mt-4">
          Continuar
        </button>
      </form>
      <div className="flex flex-row gap-2 items-center justify-center">
        <p>Ya tienes una cuenta?</p>
        <button className="link-button" onClick={() => navigate("/login")}>
          Inicia Sesión
        </button>
      </div>
    </div>
  );
};

export default SignupEmail;
