//import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Login from "./components/auth/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Login />
        <Routes>
          <Route path="/" element />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
