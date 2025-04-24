import Layout from "./Layout";
//rrd
import { Route, Routes } from "react-router-dom";
//pages
import Home from "./pages/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import SignupEmail from "./components/Signup/SignupEmail";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="signup/email" element={<SignupEmail />} />
      </Route>
    </Routes>
  );
};

export default App;
