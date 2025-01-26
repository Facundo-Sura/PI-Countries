import React from "react";
import ReactDOM from "react-dom/client";
import { store } from "./redux/store/index.js";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
//estilos para la web
import App from "./App.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
);
