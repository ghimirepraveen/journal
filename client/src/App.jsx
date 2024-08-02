//import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ForgetPassword from "./components/auth/Forgetpassword";

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Login /> */}
        <ForgetPassword />
        <Routes>
          {/* <Route path="/" element={Login} />
          <Route path="/register" element={Register} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
