// import { Routes, Route, Navigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { loginUser, registerUser } from "../../redux/user/authThunks/AuthThunks";
// import { useNavigate } from "react-router-dom";

// // import UserHome from "../../user-side/UserHome";
// import LoginForm from "../auth/forms/LoginForm";
// import RegisterForm from "../auth/RegisterForm";
// import UserHome from "../../user-side/UserHome";

// const UserRouting = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogin = async (formData) => {
//     const res = await dispatch(loginUser(formData));
//     if (res.meta.requestStatus === "fulfilled") {
//       const role = res.payload.role;
//       if (role === "admin") navigate("/admin");
//       else navigate("/home");
//     }
//   };

//   const handleRegister = async (formData) => {
//     const res = await dispatch(registerUser(formData));
//     if (res.meta.requestStatus === "fulfilled") {
//       navigate("/login");
//     }
//   };

//   return (
//     <Routes>
//       <Route path="/login" element={<LoginForm onSubmit={handleLogin} />} />
//       <Route path="/register" element={<RegisterForm onSubmit={handleRegister} />} />
//       <Route path="/home" element={<UserHome />} />
//       <Route path="*" element={<Navigate to="/login" />} />
//     </Routes>
//   );
// };

// export default UserRouting;
