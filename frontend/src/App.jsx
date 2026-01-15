import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import UserDashboardLayout from "./layouts/UserDashboardLayout";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

import DashboardHome from "./pages/dashboard/DashboardHome";
import UserServices from "./pages/dashboard/UserServices";
import UserBilling from "./pages/dashboard/UserBilling";
import UserSupport from "./pages/dashboard/UserSupport";
import UserProfile from "./pages/dashboard/UserProfile";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

import ScrollToTop from "./components/ScrollToTop";

// Protected Route Component
const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!token) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;

  return children;
};

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        {/* PUBLIC WEBSITE */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>

        {/* USER DASHBOARD */}
        <Route element={
          <ProtectedRoute role="user">
            <UserDashboardLayout />
          </ProtectedRoute>
        }>
          <Route path="/dashboard" element={<DashboardHome />} />
          <Route path="/dashboard/services" element={<UserServices />} />
          <Route path="/dashboard/billing" element={<UserBilling />} />
          <Route path="/dashboard/support" element={<UserSupport />} />
          <Route path="/dashboard/profile" element={<UserProfile />} />
        </Route>

        {/* ADMIN */}
        <Route element={
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

        {/* FALLBACK FOR ADMIN LOGIN (Old Path) */}
        <Route path="/admin/login" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
