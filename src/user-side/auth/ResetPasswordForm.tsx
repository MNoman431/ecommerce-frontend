import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../redux/user/authThunks/AuthThunks";
import { toast } from "react-hot-toast";
import type { AppDispatch, RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";

const ResetPasswordForm: React.FC = () => {
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  // ✅ Get email from localStorage saved in ForgetPasswordForm
  const email = localStorage.getItem("resetEmail") || "";

  useEffect(() => {
    if (!email) {
      toast.error("No email found! Please start from Forget Password.");
      navigate("/forget-password");
    }
  }, [email, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword) {
      toast.error("Please enter a new password");
      return;
    }

    dispatch(resetPassword({ email, newPassword }))
      .unwrap()
      .then((msg) => {
        toast.success(msg);
        localStorage.removeItem("resetEmail"); // Clear saved email
        navigate("/login"); // Redirect to login
      })
      .catch((err) => toast.error(err));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-pink-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 transition-colors"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
          Reset Password
        </h2>

        <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
          Enter a new password for your account
        </p>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            New Password
          </label>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Remembered your password?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-purple-600 hover:text-purple-700 font-medium hover:underline cursor-pointer"
            >
              Sign In
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
