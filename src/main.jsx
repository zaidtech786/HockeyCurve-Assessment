import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import {AppProvider} from "./GlobalState/Context.jsx"

createRoot(document.getElementById("root")).render(
  <AppProvider>
    <StrictMode>
      <App />
    </StrictMode>
    </AppProvider>
);
