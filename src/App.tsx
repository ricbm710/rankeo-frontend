import Layout from "./Layout";
//rrd
import { Route, Routes } from "react-router-dom";
//pages
import Home from "./pages/Home";
import Login from "./components/Auth/Login";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
};

export default App;
