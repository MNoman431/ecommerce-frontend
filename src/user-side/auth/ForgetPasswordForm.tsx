import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgetPassword } from "../../redux/user/authThunks/AuthThunks";
import { toast } from "react-hot-toast";
import type { AppDispatch, RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";

const ForgetPasswordForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(forgetPassword(email))
      .unwrap()
      .then((msg) => {
        toast.success(msg);
        localStorage.setItem("resetEmail", email); // ✅ save email
        navigate("/otp-verify"); // ✅ redirect to OTP page
      })
      .catch((err) => toast.error(err));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 transition-colors"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
          Forgot Password
        </h2>

        <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
          Enter your email to receive a one-time password (OTP)
        </p>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Remember your password?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 hover:text-blue-700 font-medium hover:underline cursor-pointer"
            >
              Sign In
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ForgetPasswordForm;
