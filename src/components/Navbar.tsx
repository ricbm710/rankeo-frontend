//rrd
import { Link, useLocation } from "react-router-dom";
//custom hooks
import { useUser } from "../hooks/useUser";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();
  const hideLogin = ["/login", "/signup"].some((path) =>
    location.pathname.startsWith(path)
  );

  const { user, loading } = useUser();

  return (
    <div className="bg-col3 flex flex-row items-center justify-between">
      <Link to="/" className="block p-3 text-2xl text-white font-bold bg-col3">
        Rankeo
      </Link>

      <div className="p-3">
        {loading ? (
          <p className="text-white">Verificando...</p>
        ) : user ? (
          <Link to="/" className="flex flex-row items-center gap-2 text-white">
            <FaUser />
            <p>{user.name.split(" ")[0]}</p>
          </Link>
        ) : (
          <div>
            {!hideLogin && (
              <Link to="/login" className="text-white">
                Inicia Sesión
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
