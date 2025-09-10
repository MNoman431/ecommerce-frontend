import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtp } from "../../redux/user/authThunks/AuthThunks";
import { toast } from "react-hot-toast";
import type { AppDispatch, RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";

const OtpVerifyForm: React.FC = () => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  // ✅ email fetch from localStorage (saved in ForgetPasswordForm)
  const email = localStorage.getItem("resetEmail") || "";

  useEffect(() => {
    if (!email) {
      toast.error("No email found! Please start from Forget Password.");
      navigate("/forget-password");
    }
  }, [email, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }

    dispatch(verifyOtp({ email, otp }))
      .unwrap()
      .then((msg) => {
        toast.success(msg);
        navigate("/reset-password"); // move to reset password form
      })
      .catch((err) => toast.error(err));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 transition-colors"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
          Verify OTP
        </h2>

        <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
          Enter the OTP sent to your email
        </p>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            OTP
          </label>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Didn't receive OTP?{" "}
            <span
              onClick={() => navigate("/forget-password")}
              className="text-green-600 hover:text-green-700 font-medium hover:underline cursor-pointer"
            >
              Resend OTP
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default OtpVerifyForm;
