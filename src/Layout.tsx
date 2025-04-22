//rrd
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="bg-col8 min-h-screen">
      <div>Navbar</div>
      <Outlet />
    </div>
  );
};

export default Layout;
