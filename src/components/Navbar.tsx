import { useEffect, useRef, useState } from "react";
//rrd
import { Link, useLocation } from "react-router-dom";
//custom hooks
import { useUser } from "../hooks/useUser";
//react-icons
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();
  const hideLogin = ["/login", "/signup"].some((path) =>
    location.pathname.startsWith(path)
  );

  const { user, loading } = useUser();

  //profile dropdown menu
  const [isOpen, setIsOpen] = useState(false);
  //creates a copy of the HTML structure of the dropdown
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-col3 flex flex-row items-center justify-between">
      <Link to="/" className="block p-3 text-2xl text-white font-bold bg-col3">
        Rankeo
      </Link>
      {/* notice I'm using relative position because of my dropdown menu */}
      <div className="p-3 relative" ref={dropdownRef}>
        {loading ? (
          <p className="text-white">Verificando...</p>
        ) : user ? (
          <button
            className="flex flex-row items-center gap-2 text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FaUser />
            <p>{user.name.split(" ")[0]}</p>
          </button>
        ) : (
          <div>
            {!hideLogin && (
              <Link to="/login" className="text-white">
                Inicia Sesión
              </Link>
            )}
          </div>
        )}
        {/* dropdown menu */}
        {isOpen && user && (
          <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md z-50">
            <Link
              to="/profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Mi Perfil
            </Link>
            <button className="btn-dropdown px-4 py-2 text-sm hover:bg-gray-100">
              Cerrar Sesión
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
