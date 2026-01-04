import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

import ScrollToTop from "./components/ScrollToTop";

/*
  App Root
  --------
  - Routing only
  - Layout-based routing
*/

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
        </Route>

        {/* ADMIN (NO NAV / FOOTER) */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
