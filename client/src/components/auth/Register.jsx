// components/login/Login.js
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;

    if (!email) {
      setNameError("Name required");
      valid = false;
    } else {
      setNameError("");
    }

    if (!email) {
      setEmailError("Email required");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password required");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (valid) {
      dispatch(register({ name, email, password })).then((result) => {
        if (result.meta.requestStatus === "fulfilled") {
          navigate("/");
        }
      });
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-black" : "bg-white text-gray-900"
      }`}
    >
      <div className="max-w-md w-full p-8 bg-white dark:bg-gray-900 shadow-lg rounded-lg">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-3xl font-bold">SignUp</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Name</label>
            <input
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            />
            {nameError && <p className="text-red-500 mt-1">{nameError}</p>}
          </div>

          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            />
            {emailError && <p className="text-red-500 mt-1">{emailError}</p>}
          </div>
          <div className="mb-4">
            <label className="block mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            {loading ? "Signing..." : "SignUp"}
          </button>
          {error && (
            <p className="text-red-500 mt-4">
              {error}{" "}
              <Link className="text-blue-400 ml-6" to="/forget-password">
                Forget Password?
              </Link>
            </p>
          )}

          <div className="flex justify-center items-center">
            <p className="text-black ">
              <Link className="text-blue-400" to="/">
                Already have an account
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
