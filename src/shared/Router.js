import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import Login from "../pages/Login";

function Router() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
