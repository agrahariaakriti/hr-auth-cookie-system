import Register from "./pages/Register";
import { Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useContext } from "react";
import { DataContext } from "./Store/DataStore";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      {/* <Route path="/logout" element={<Welcome />} /> */}
    </Routes>
  );
}

export default App;
