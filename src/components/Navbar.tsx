import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-col3">
      <Link to="/" className="block p-3 text-2xl text-white font-bold bg-col3">
        Rankeo
      </Link>
    </div>
  );
};

export default Navbar;
