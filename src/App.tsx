import Layout from "./Layout";
//rrd
import { Route, Routes } from "react-router-dom";
//pages
import Home from "./pages/Home";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import SignupEmail from "./components/Signup/SignupEmail";
import Profile from "./components/User/Profile";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="signup/email" element={<SignupEmail />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default App;
