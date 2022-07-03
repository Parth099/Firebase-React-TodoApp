//std imports
import React from "react";
import ReactDOM from "react-dom/client";

//components
import "./index.css";
import App from "./App"; //nav bar

//routes
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}></Route>
        </Routes>
    </BrowserRouter>
);
