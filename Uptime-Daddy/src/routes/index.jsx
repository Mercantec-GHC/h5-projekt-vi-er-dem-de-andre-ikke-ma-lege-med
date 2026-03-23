import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../molecules/login/login";
import Register from "../molecules/register/register";
import App from "../App";

function hasAuthToken() {
  return Boolean(localStorage.getItem("authToken"));
}

function ProtectedRoute({ children }) {
  return hasAuthToken() ? children : <Navigate to="/login" replace />;
}

function PublicOnlyRoute({ children }) {
  return hasAuthToken() ? <Navigate to="/" replace /> : children;
}

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <Login />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicOnlyRoute>
              <Register />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <App />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={<Navigate to={hasAuthToken() ? "/" : "/login"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}