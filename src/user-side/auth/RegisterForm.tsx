
import React, { useState, FormEvent, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { registerUser } from "../../redux/user/authThunks/AuthThunks";
import { resetAuthState } from "../../redux/user/authSlice/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";

const RegisterForm: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("user");

  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      toast.success("Registration successful! Please log in.");
      // Clear any accidental logged-in state from register response
      localStorage.removeItem("user");
      localStorage.removeItem("role");
      dispatch(resetAuthState());
      navigate("/login");
    }
    if (error) toast.error(error);
  }, [user, error, navigate, dispatch]);
  

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email || !password || !role) {
      toast.error("Please fill all fields");
      return;
    }
    dispatch(registerUser({ name, email, password, role }));
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 text-white p-3 rounded hover:bg-green-600 transition disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      <p className="mt-4 text-center text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Login here
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
