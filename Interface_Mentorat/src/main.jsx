import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import RoutesComponent from "./routes/index.jsx"; // Assure-toi que le chemin est correct
import { store } from "./reducers/index.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
      <StrictMode>
        <RoutesComponent />
      </StrictMode>
  </Provider>
);
