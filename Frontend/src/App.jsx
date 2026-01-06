import Register from "./pages/Register";
import { Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ChgDetail from "./pages/ChnDetail";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />

      <Route path="/chgDetail" element={<ChgDetail />} />
    </Routes>
  );
}

export default App;
