//rrd
import { Outlet } from "react-router-dom";
//components
import Navbar from "./components/Navbar";

const Layout = () => {
  return (
    <div className="bg-col-bg min-h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
