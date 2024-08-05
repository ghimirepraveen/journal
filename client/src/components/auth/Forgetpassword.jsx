import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../features/auth/authSlice";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const darkMode = useSelector((state) => state.theme.darkMode);

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    if (!email) {
      setEmailError("Email required");
      valid = false;
    } else {
      setEmailError("");
    }
    if (valid) {
      dispatch(forgotPassword({ email })).then((result) => {
        if (result.meta.requestStatus === "fulfilled") {
          setMessage("Email sent successfully.Check your mail.");
        }
      });
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
          <h2 className="text-3xl font-bold">Forgetpassword</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2"> Enter your valid Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            />
            {emailError && <p className="text-red-500 mt-1">{emailError}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-300"
          >
            {loading ? "Sending " : "Sent"}
          </button>
          {error && <p className="text-red-500 m-4">{error}</p>}
          {message && <p className="text-green-500 m-4">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
