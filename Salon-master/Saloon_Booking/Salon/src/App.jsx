import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/frontend/LandingPage";
import LoginPage from "./components/frontend/Login/LoginPage"; // Make sure this path is valid
import RegisterSalon from "./components/frontend/Register/RegisterSalon";
import RegisterCustomer from "./components/frontend/Register/RegisterCustomer";
import CustomerDashboard from "./components/frontend/Customer/CustomerDashboard";
import Profile from "./components/frontend/Customer/Profile";
import BookingsAndRequests from "./components/frontend/Customer/BookingsAndRequests";
import SalonAdminDashboard from "./components/frontend/SalonAdmin/SalonAdminDashboard";
import StylistDashboard from "./components/frontend/Stylist/StylistDashboard";
import LoginCustomer from "./components/frontend/Login/LoginCustomer";
import LoginProfessional from "./components/frontend/Login/LoginProfessional";
import AdminDashboard from "./components/frontend/Admin/AdminDashboard";
import AdminLogin from "./components/frontend/Admin/AdminLogin";
import BookSalon from "./components/frontend/Customer/BookSalon";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/login/customer" element={<LoginCustomer />} />
      <Route path="/login/professional" element={<LoginProfessional />} />
      <Route path="/register/salon" element={<RegisterSalon/>}/>
      <Route path="/register/customer" element={<RegisterCustomer/>}/>
      <Route path="/dashboard/customer" element={<CustomerDashboard/>} />
      <Route path="/dashboard/salon" element={<SalonAdminDashboard/>} />
      <Route path="/customer/profile" element={<Profile/>} />
      <Route path="/customer/bookings" element={<BookingsAndRequests/>} />
      <Route path="/dashboard/stylist" element={<StylistDashboard/>} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/book-salon/:id" element={<BookSalon />} />
    </Routes>
  );
}

export default App;



