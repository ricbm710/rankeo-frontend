//rrd
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const hideLogin = ["/login", "/signup"].some((path) =>
    location.pathname.startsWith(path)
  );
  return (
    <div className="bg-col3 flex flex-row items-center justify-between">
      <Link to="/" className="block p-3 text-2xl text-white font-bold bg-col3">
        Rankeo
      </Link>
      <div className="flex flex-row">
        {!hideLogin && (
          <Link to="/login" className="p-3 text-white">
            Inicia Sesión
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
