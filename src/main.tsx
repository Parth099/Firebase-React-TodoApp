//std imports
import React from "react";
import ReactDOM from "react-dom/client";

//components
import "./index.css";
import App from "./App"; //nav bar

//routes
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./routes/SignUp/SignUp";
import SignIn from "./routes/SignIn/SignIn";
import TasksView from "./routes/Tasks/Tasks";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route path="/sign-up" element={<SignUp />}></Route>
                <Route path="/sign-in" element={<SignIn />}></Route>
                <Route path="/tasks" element={<TasksView />}></Route>
                <Route path="*"></Route>
            </Route>

            <Route path="*" element={""}></Route>
        </Routes>
    </BrowserRouter>
);
