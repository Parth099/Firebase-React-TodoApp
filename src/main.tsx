//std imports
import React from "react";
import ReactDOM from "react-dom/client";

//components
import "./index.css";
import App from "./App"; //nav bar

//routes
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./routes/SignIn";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route path="/login" element={<SignIn />}></Route>
                <Route path="*"></Route>
            </Route>

            <Route path="*" element={""}></Route>
        </Routes>
    </BrowserRouter>
);
