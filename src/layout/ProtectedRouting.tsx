// import { Routes, Route, Navigate } from "react-router-dom";
// import AdminRoutes from "../admin-side/routes/AdminRoutes";
// import UserLayout from "../user-side/userLayout/UserLayout";
// import LoginForm from "../user-side/auth/LoginForm";
// import RegisterForm from "../user-side/auth/RegisterForm";
// import { useSelector } from "react-redux";
// import type { RootState } from "../redux/store";

// const ProtectedRouting = () => {
//   const { user } = useSelector((state: RootState) => state.auth);

//   // Admin - redirect to admin panel
//   if (user?.role === "admin") {
//     return (
//       <Routes>
//         <Route path="/*" element={<AdminRoutes />} />
//         <Route path="/login" element={<Navigate to="/" replace />} />
//         <Route path="/register" element={<Navigate to="/" replace />} />
//       </Routes>
//     );
//   }

//   // Logged in User - redirect to user dashboard
//   if (user?.role === "user") {
//     return (
//       <Routes>
//         <Route path="/user/*" element={<UserLayout />} />
//         <Route path="/orders" element={<Navigate to="/user/orders" replace />} />
//         <Route path="/cart" element={<Navigate to="/user/cart" replace />} />
//         <Route path="/checkout" element={<Navigate to="/user/checkout" replace />} />
//         <Route path="/profile" element={<Navigate to="/user/profile" replace />} />
//         <Route path="/login" element={<Navigate to="/user" replace />} />
//         <Route path="/register" element={<Navigate to="/user" replace />} />
//         <Route path="*" element={<Navigate to="/user" replace />} />
//       </Routes>
//     );
//   }

//   // No user (Guest) - Allow public browsing + auth routes
//   return (
//     <Routes>
//       {/* Public routes - anyone can access */}
//       <Route path="/" element={<UserLayout />} />
//       <Route path="/covers" element={<UserLayout />} />
//       <Route path="/contact" element={<UserLayout />} />
//       <Route path="/product/:id" element={<UserLayout />} />
      
//       {/* Auth routes */}
//       <Route path="/login" element={<LoginForm />} />
//       <Route path="/register" element={<RegisterForm />} />
      
//       {/* Protected routes - require login */}
//       <Route path="/cart" element={<Navigate to="/login" replace />} />
//       <Route path="/checkout" element={<Navigate to="/login" replace />} />
//       <Route path="/orders" element={<Navigate to="/login" replace />} />
//       <Route path="/profile" element={<Navigate to="/login" replace />} />
//       <Route path="/user/*" element={<Navigate to="/login" replace />} />
      
//       {/* Default redirect */}
//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   );
// };

// export default ProtectedRouting;



import { Routes, Route, Navigate } from "react-router-dom";
import AdminRoutes from "../admin-side/routes/AdminRoutes";
import UserLayout from "../user-side/userLayout/UserLayout";
import LoginForm from "../user-side/auth/LoginForm";
import RegisterForm from "../user-side/auth/RegisterForm";
import ForgetPasswordForm from "../user-side/auth/ForgetPasswordForm";
import OtpVerifyForm from "../user-side/auth/OtpVerifyForm";
import ResetPasswordForm from "../user-side/auth/ResetPasswordForm";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

const ProtectedRouting = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  // Admin - redirect to admin panel
  if (user?.role === "admin") {
    return (
      <Routes>
        <Route path="/*" element={<AdminRoutes />} />
        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route path="/register" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  // Logged in User - redirect to user dashboard
  if (user?.role === "user") {
    return (
      <Routes>
        <Route path="/user/*" element={<UserLayout />} />
        <Route path="/orders" element={<Navigate to="/user/orders" replace />} />
        <Route path="/cart" element={<Navigate to="/user/cart" replace />} />
        <Route path="/checkout" element={<Navigate to="/user/checkout" replace />} />
        <Route path="/profile" element={<Navigate to="/user/profile" replace />} />
        <Route path="/login" element={<Navigate to="/user" replace />} />
        <Route path="/register" element={<Navigate to="/user" replace />} />
        <Route path="*" element={<Navigate to="/user" replace />} />
      </Routes>
    );
  }

  // No user (Guest) - Allow public browsing + auth routes
  return (
    <Routes>
      {/* Public routes - anyone can access */}
      <Route path="/" element={<UserLayout />} />
      <Route path="/covers" element={<UserLayout />} />
      <Route path="/contact" element={<UserLayout />} />
      <Route path="/product/:id" element={<UserLayout />} />
      
      {/* Auth routes */}
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/forget-password" element={<ForgetPasswordForm />} />
      <Route path="/otp-verify" element={<OtpVerifyForm />} />
      <Route path="/reset-password" element={<ResetPasswordForm />} />
      
      {/* Protected routes - require login */}
      <Route path="/cart" element={<Navigate to="/login" replace />} />
      <Route path="/checkout" element={<Navigate to="/login" replace />} />
      <Route path="/orders" element={<Navigate to="/login" replace />} />
      <Route path="/profile" element={<Navigate to="/login" replace />} />
      <Route path="/user/*" element={<Navigate to="/login" replace />} />
      
      {/* Default redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default ProtectedRouting;
