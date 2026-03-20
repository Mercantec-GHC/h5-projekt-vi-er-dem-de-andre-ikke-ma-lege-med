import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../molecules/login/login";
import Register from "../molecules/register/register";
import App from "../App";


export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
}