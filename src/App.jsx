import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateEvent from "./pages/CreateEvent";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateEvent />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Signup" element={<Signup/>} />  
        <Route path="/ForgotPassword" element={<ForgotPassword/>} />   
      </Routes>
    </>
  );
}
export default App;
