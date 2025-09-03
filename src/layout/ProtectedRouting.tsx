import { Routes, Route, Navigate } from "react-router-dom";
import AdminRoutes from "../admin-side/routes/AdminRoutes";
import UserLayout from "../user-side/userLayout/UserLayout";
import LoginForm from "../user-side/auth/LoginForm";
import RegisterForm from "../user-side/auth/RegisterForm";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

const ProtectedRouting = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  // No user: expose auth routes only
  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  // Admin
  if (user.role === "admin") {
    return (
      <Routes>
        <Route path="/*" element={<AdminRoutes />} />
        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route path="/register" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  // User
  return (
    // <Routes>
    //   {/* <Route path="/user/*" element={<UserLayout />} />
    //   <Route path="/login" element={<Navigate to="/user" replace />} />
    //   <Route path="/register" element={<Navigate to="/user" replace />} />
    //   <Route path="*" element={<Navigate to="/user" replace />} /> */}
      
    // </Routes>


    <Routes>
    <Route path="/user/*" element={<UserLayout />} />
    <Route path="/login" element={<Navigate to="/user" replace />} />
    <Route path="/register" element={<Navigate to="/user" replace />} />
    <Route path="*" element={<Navigate to="/user" replace />} />
  </Routes>
  );
};

export default ProtectedRouting;
