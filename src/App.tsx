import Layout from "./Layout";
//rrd
import { Route, Routes } from "react-router-dom";
//pages
import Home from "./pages/Home";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
};

export default App;
