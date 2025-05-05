import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
//main css
import "./index.css";
//main app
import App from "./App.tsx";
//rrd
import { BrowserRouter } from "react-router-dom";
//contexts
// import { UserProvider } from "./contexts/UserContext.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.VITE_BASE_PATH}>
      {/* <UserProvider> */}
      <App />
      {/* </UserProvider> */}
    </BrowserRouter>
  </StrictMode>
);
