import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../../features/auth/authSlice"; // Update the import path if necessary

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [verifiedPassword, setVerifiedPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const navigate = useNavigate();
  const { token } = useParams();
  console.log(token);

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;

    if (!newPassword) {
      setPasswordError("Password required");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!verifiedPassword) {
      setPasswordError("Password required");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (valid) {
      dispatch(resetPassword({ token, newPassword, verifiedPassword })).then(
        (result) => {
          if (result.meta.requestStatus === "fulfilled") {
            navigate("/");
          }
        }
      );
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-black" : "bg-white text-black"
      }`}
    >
      <div className="max-w-md w-full p-8 bg-white dark:bg-gray-900 shadow-lg rounded-lg">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-3xl font-bold">Reset Password</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            />
            {passwordError && (
              <p className="text-red-500 mt-1">{passwordError}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-2">Verified Password</label>
            <input
              type="password"
              value={verifiedPassword}
              onChange={(e) => setVerifiedPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            />
            {passwordError && (
              <p className="text-red-500 mt-1">{passwordError}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-300"
          >
            {loading ? "Submitting ...." : "Submit"}
          </button>
          {error && <p className="text-red-500 m-4">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
